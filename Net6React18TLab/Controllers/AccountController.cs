using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Net6React18TLab.Services;

namespace Net6React18TLab.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]/[action]")]
public class AccountController : ControllerBase
{
  readonly ILogger<AccountController> _logger;
  readonly AccountService _accountSvc;

  public AccountController(ILogger<AccountController> logger, AccountService accountSvc)
  {
    _logger = logger;
    _accountSvc = accountSvc;
  }

  



  [HttpPost]
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
    if (_accountSvc.ValidateUser(login, out UserInfo? user))
    {
      var token = _accountSvc.GenerateJwtToken(user.userId);
      return Ok(new {
        userId = user.userId,
        userName = user.userName,
        token 
      });
    }

    // 預設失敗
    return Unauthorized();
  }
}
