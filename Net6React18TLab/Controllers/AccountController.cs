using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Net6React18TLab.Services;
using System.Net;
using System.Reflection;

namespace Net6React18TLab.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]/[action]")]
public class AccountController : ControllerBase
{
  readonly ILogger<AccountController> _logger;
  readonly AccountService _account;
  readonly IConfiguration _config;

  public AccountController(ILogger<AccountController> logger, AccountService account, IConfiguration config)
  {
    _logger = logger;
    _account = account;
    _config = config;
  }

  [HttpPost]
  [HttpGet]
  public IActionResult Echo(EchoArgs args)
  {
    return Ok(new
    {
      echo = $"{args.knock}@{DateTime.Now:HH:mm:ss}",
    });
  }

  public record EchoArgs
  {
    public string knock { get; set; } = String.Empty;
  }

  [HttpPost]
  public IActionResult SignIn(LoginArgs login)
  {
    // 模擬長時間登入
    SpinWait.SpinUntil(() => false, 2000);

    if (!_account.Authenticate(login))
      return Unauthorized();

    var authUser = _account.Authorize(login.userId);
    if (authUser == null)
      return Unauthorized();

    var token = _account.GenerateJwtToken(authUser);

    //// ※ 送回的cookie有效
    //Response.Cookies.Append($"{_config["JwtSettings:Issuer"]}.Cookie", token, new CookieOptions
    //{
    //  Secure = true,
    //  HttpOnly = true,
    //  SameSite = SameSiteMode.Lax,
    //  Expires = authUser.ExpiresUtc,      
    //});

    return Ok(new
    {
      userId = authUser.UserId,
      userName = authUser.UserName,
      expiredTime = authUser.ExpiresUtc.ToLocalTime(),
      token
    });
  }
}
