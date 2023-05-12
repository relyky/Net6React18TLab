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
using Net6React18TLab.Models;
using System.Diagnostics;
using Net6React18TLab.Dto.Account;

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
  public ActionResult<EchoResult> Echo(EchoArgs args)
  {
    if(DateTime.Now.Second % 3 == 0)
    {
      return BadRequest("我是測試用錯誤訊息！");
    }

    return Ok(new EchoResult
    {
      Echo = $"{args.Knock}@{DateTime.Now:HH:mm:ss}",
    });
  }

  [HttpPost]
  public IActionResult SignIn(LoginArgs login)
  {
    // 模擬長時間運算
    SpinWait.SpinUntil(() => false, 2000);

    if (!_account.Authenticate(login))
      return Unauthorized();

    var authUser = _account.Authorize(login.userId);
    if (authUser == null)
      return Unauthorized();

    var token = _account.GenerateJwtToken(authUser);

    return Ok(new
    {
      loginUserId = authUser.UserId,
      loginUserName = authUser.UserName,
      expiredTime = authUser.ExpiresUtc.ToLocalTime(),
      authToken = token
    });
  }

  /// <summary>
  /// 登出
  /// </summary>
  [HttpPost]
  [Authorize]
  public IActionResult Logout()
  {
    // 模擬長時間運算
    SpinWait.SpinUntil(() => false, 2000);

    // 登出
    _account.SignOut(HttpContext.User.Identity);
    return Ok(new ErrMsg { 
      type = ErrMsg.success,
      message = "登出完成。" 
    });
  }

  /// <summary>
  /// 取得現在連線會話中的使用者
  /// </summary>
  [HttpPost]
  [Authorize]
  public IActionResult GetAuthInfo()
  {
    // 模擬長時間運算
    SpinWait.SpinUntil(() => false, 2000);

    // 取現在登入授權資料
    AuthUser? authUser = _account.GetSessionUser(HttpContext.User.Identity);
    if(authUser == null)
      return Unauthorized();

    var token = _account.GenerateJwtToken(authUser);

    return Ok(new
    {
      loginUserId = authUser.UserId,
      loginUserName = authUser.UserName,
      expiredTime = authUser.ExpiresUtc.ToLocalTime(),
      authToken = token
    });
  }
}
