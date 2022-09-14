using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;

namespace Net6React18TLab.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]/[action]")]
public class AccountController : ControllerBase
{
  readonly ILogger<AccountController> _logger;
  readonly IHttpContextAccessor _http;
  readonly IConfiguration _config;

  public AccountController(ILogger<AccountController> logger, IHttpContextAccessor http, IConfiguration config)
  {
    _logger = logger;
    _http = http;
    _config = config;
  }

  [NonAction]
  string GenerateJwtToken(string userName)
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
    claims.Add(new Claim("roles", "Admin"));
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

  [NonAction]
  bool ValidateUser(SignInArgs login, out UserInfo? user) 
  {
    if(login.userId == "smart")
    {
      user = new UserInfo { 
        userId = "smart",
        userName = "郝聰明"
      };
      return true;
    }

    // 預設失敗
    user = null;
    return false;
  }

  [HttpPost]
  public IActionResult Echo(EchoArgs args)
  {
    return Ok(new
    {
      message = $"{args.knock}@{DateTime.Now:HH:mm:ss}",
      hasHttpContext = _http.HttpContext != null,
      userName = _http.HttpContext?.User.Identity?.Name ?? "unknown"
    });
  }

  public record EchoArgs
  {
    public string knock { get; set; } = String.Empty;
  }

  [HttpPost]
  public IActionResult SignIn(SignInArgs login)
  {
    if (ValidateUser(login, out UserInfo? user))
    {
      var token = GenerateJwtToken(user.userId);
      return Ok(new {
        userId = user.userId,
        userName = user.userName,
        token 
      });
    }

    // 預設失敗
    return Unauthorized();
  }

  public record SignInArgs
  {
    public string userId { get; set; } = String.Empty;
    public string mima { get; set; } = String.Empty;
    public string remember { get; set; } = String.Empty;
  }

  record UserInfo
  {
    public string userId { get; set; } = String.Empty;
    public string userName { get; set; } = String.Empty;
  }
}
