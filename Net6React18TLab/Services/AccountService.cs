using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Xml.Linq;

namespace Net6React18TLab.Services;

/// <summary>
/// 登入授權服務
/// ※ 需搭配 Singleton Injection。
/// </summary>
public class AccountService
{
  readonly ILogger<AccountService> _logger;
  readonly IConfiguration _config;

  public AccountService(ILogger<AccountService> logger, IConfiguration config)
  {
    _logger = logger;
    _config = config;
  }
  
  internal string GenerateJwtToken(string userName)
  {
    string issuer = _config["JwtSettings:Issuer"];
    string signKey = _config["JwtSettings:SignKey"];
    int expireMinutes = int.Parse(_config["JwtSettings:ExpireMinutes"]);

    // Configuring "Claims" to your JWT Token
    var claims = new List<Claim>();

    // In RFC 7519 (Section#4), there are defined 7 built-in Claims, but we mostly use 2 of them.
    claims.Add(new Claim(JwtRegisteredClaimNames.Sub, userName)); // User.Identity.Name
    claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())); // JWT ID
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
    claims.Add(new Claim("roles", "Users"));

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

  internal bool ValidateUser(LoginArgs login, out UserInfo? user)
  {
    if (login.userId == "smart")
    {
      user = new UserInfo
      {
        userId = "smart",
        userName = "郝聰明"
      };
      return true;
    }

    // 預設失敗
    user = null;
    return false;
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

internal record UserInfo
{
  public string userId { get; set; } = String.Empty;
  public string userName { get; set; } = String.Empty;
}
