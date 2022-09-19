using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Xml.Linq;
using Net6React18TLab.Models;
using Microsoft.Extensions.Caching.Memory;
using System.Security.Principal;

namespace Net6React18TLab.Services;

/// <summary>
/// 登入授權服務
/// ※ 需搭配 Singleton Injection。
/// </summary>
public class AccountService
{
  readonly ILogger<AccountService> _logger;
  readonly IConfiguration _config;
  readonly IHttpContextAccessor _http;
  readonly IMemoryCache _cache;

  // use to lock
  readonly object _lockObj = new object();

  public AccountService(ILogger<AccountService> logger, IConfiguration config, IHttpContextAccessor http, IMemoryCache cache)
  {
    _logger = logger;
    _config = config;
    _http = http;
    _cache = cache;
  }

  /// <summary>
  /// 認證檢查
  /// </summary>
  internal bool Authenticate(LoginArgs ln)
  {
    try
    {
      if (String.IsNullOrWhiteSpace(ln.userId))
        throw new ApplicationException("登入認證失敗！");

      if (String.IsNullOrWhiteSpace(ln.credential))
        throw new ApplicationException("登入認證失敗！");

      //## verify vcode;
      if (!"123456".Equals(ln.vcode))
        throw new ApplicationException("登入認證失敗！");

      //## 驗證帳號與密碼
      ////# 再用新光的AD驗證
      //if (!"ByPassAD".Equals(_config["ADByPass"]))
      //{
      //  string ldapHost = _config["ADHost"];
      //  if (!ADAuthenticate(ldapHost, ln.userId, ln.credential))
      //    throw new ApplicationException("登入認證失敗！");
      //}
      //else
      //{
      //  _logger.WarnEx($"登入認證時跳過AD驗證，帳號：{ln.userId}。");
      //}

      //## 帳號特例:測試
      if (ln.userId == "smart" || ln.userId == "beauty")
        return true;

      // 預設失敗
      throw new ApplicationException("登入認證失敗！");
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, $"Authenticate FAIL, userId:{ln.userId}.");
      return false;
    }
  }

  /// <summary>
  /// 取得授權資料，並存入授權資料緩存區。
  /// </summary>
  internal AuthUser? Authorize(string userId)
  {
    try
    {
      if (string.IsNullOrWhiteSpace(userId))
        throw new ArgumentNullException(nameof(userId));

      double expiresMinutes = _config.GetValue<double>("JwtSettings:ExpireMinutes");

      #region # 取登入者來源IP
      string clientIp = "無法取得來源IP";
      string hostName = "無法識別或失敗";
      try
      {
        IPAddress? remoteIp = _http.HttpContext?.Connection.RemoteIpAddress;
        if (remoteIp != null)
        {
          clientIp = remoteIp.ToString();
          hostName = Dns.GetHostEntry(remoteIp).HostName;
        }
      }
      catch
      {
        // 預防取不到IP/HostName當掉。
      }
      #endregion

      ///
      ///※ 可以進來執行表示身份驗證已成功。這裡只處理取得授權能力。
      ///

      AuthUser? authUser = null;

      #region ## 帳號特例：內定系統管理員
      if (userId == "smart")
      {
        authUser = new AuthUser
        {
          UserId = "smart",
          UserName = "郝聰明",
          Roles = new string[] { "user" },
          AuthGuid = Guid.NewGuid(),
          IssuedUtc = DateTimeOffset.UtcNow,
          ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(expiresMinutes),
          ClientIp = clientIp,
          AuthMenu = new MenuInfo()
        };

        authUser.AuthMenu.AddMenuGroup(new MenuGroup { groupId = "DEMO", groupName = "測試功能" })
            .AddMenuItem(new MenuItem { funcId = "DEMO01", funcName = "系統與環境參數", url = "/demo01" })
            .AddMenuItem(new MenuItem { funcId = "DEMO02", funcName = "Redux Counter", url = "/demo02" })
            .AddMenuItem(new MenuItem { funcId = "DEMO03", funcName = "Material UI 展示", url = "/demo03" })
            .AddMenuItem(new MenuItem { funcId = "DEMO04", funcName = "通訊測試", url = "/demo04" });
      }

      #endregion

      //## 取得授權
      //AuthUser? authUser = AuthModule.GetUserAuthz(userId, "SSO"); // config["SystemID"]

      if (authUser == null)
        throw new ArgumentNullException(nameof(authUser));

      lock (_lockObj)
      {
        ///※ 授權資料建議存入Database，可用 MemoryCache 加速。
        _cache.Set<AuthUser>(authUser.AuthGuid, authUser, TimeSpan.FromMinutes(expiresMinutes));
      }

      // success
      //※ 正常來說授權不會失敗！
      _logger.LogInformation($"Authorize SUCCESS, userId:{authUser.UserId}.");
      return authUser;
    }
    catch (Exception ex)
    {
      _logger.LogError($"Authorize FAIL, userId:{userId}.", ex);
      return null;
    }
  }

  /// <summary>
  /// 依授權資料生成權杖
  /// </summary>
  internal string GenerateJwtToken(AuthUser auth)
  {
    string issuer = _config["JwtSettings:Issuer"];
    string signKey = _config["JwtSettings:SignKey"];
    int expireMinutes = int.Parse(_config["JwtSettings:ExpireMinutes"]);

    // Configuring "Claims" to your JWT Token
    var claims = new List<Claim>();

    // In RFC 7519 (Section#4), there are defined 7 built-in Claims, but we mostly use 2 of them.
    claims.Add(new Claim(JwtRegisteredClaimNames.Sub, auth.UserId)); // User.Identity.Name
    claims.Add(new Claim(JwtRegisteredClaimNames.Jti, auth.AuthGuid.ToString())); // JWT ID

    //claims.Add(new Claim(JwtRegisteredClaimNames.Iss, issuer));
    //claims.Add(new Claim(JwtRegisteredClaimNames.Aud, "The Audience"));
    //claims.Add(new Claim(JwtRegisteredClaimNames.Exp, DateTimeOffset.UtcNow.AddMinutes(30).ToUnixTimeSeconds().ToString()));
    //claims.Add(new Claim(JwtRegisteredClaimNames.Nbf, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString())); // 必須為數字
    //claims.Add(new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString())); // 必須為數字

    // The "NameId" claim is usually unnecessary.
    //claims.Add(new Claim(JwtRegisteredClaimNames.NameId, userName));

    // This Claim can be replaced by JwtRegisteredClaimNames.Sub, so it's redundant.
    //claims.Add(new Claim(ClaimTypes.Name, userName));

    // TODO: You can define your "roles" to your Claims.
    //claims.Add(new Claim("roles", "Admin"));
    //claims.Add(new Claim("roles", "Users"));
    foreach (string role in auth.Roles)
      claims.Add(new Claim("roles", role));

    var userClaimsIdentity = new ClaimsIdentity(claims);

    // Create a SymmetricSecurityKey for JWT Token signatures
    var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(signKey));

    // HmacSha256 MUST be larger than 128 bits, so the key can't be too short. At least 16 and more characters.
    // https://stackoverflow.com/questions/47279947/idx10603-the-algorithm-hs256-requires-the-securitykey-keysize-to-be-greater
    var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

    // Create SecurityTokenDescriptor
    var tokenDescriptor = new SecurityTokenDescriptor
    {
      Issuer = issuer,
      //Audience = issuer, // Sometimes you don't have to define Audience.
      //NotBefore = DateTime.Now, // Default is DateTime.Now
      //IssuedAt = DateTime.Now, // Default is DateTime.Now
      Subject = userClaimsIdentity,
      Expires = DateTime.Now.AddMinutes(expireMinutes),
      SigningCredentials = signingCredentials
    };

    // Generate a JWT securityToken, than get the serialized Token result (string)
    var tokenHandler = new JwtSecurityTokenHandler();
    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
    var serializeToken = tokenHandler.WriteToken(securityToken);

    return serializeToken;
  }

  internal AuthUser? GetCurrentUser(IIdentity? id)
  {
    var identity = id as ClaimsIdentity;
    if (identity == null) return null;

    var jtiClaim = identity.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti);
    if(jtiClaim == null) return null;

    if (!Guid.TryParse(jtiClaim.Value, out Guid authGuid))
      return null;

    lock (_lockObj)
    {
      return _cache.Get<AuthUser>(authGuid);
    }
  }
}

public record LoginArgs
{
  [Required]
  [Display(Name = "帳號")]
  public string userId { get; set; } = string.Empty;

  [Required]
  [Display(Name = "通關密語")]
  public string credential { get; set; } = String.Empty;

  [Required]
  [Display(Name = "驗證碼")]
  public string vcode { get; set; } = String.Empty;

  [Display(Name = "回轉網址")]
  public string returnUrl { get; set; } = "/";
}
