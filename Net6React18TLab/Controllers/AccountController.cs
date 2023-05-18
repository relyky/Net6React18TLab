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
using Swashbuckle.AspNetCore.Annotations;

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
    try
    {
      // 模擬執行失敗
      if (args.LetMeFail)
      {
        return BadRequest("這是邏輯上錯誤！");
      }

      // 模擬執行失敗
      if (DateTime.Now.Second % 3 == 0)
      {
        throw new ApplicationException("我是測試用出現例外訊息！");
      }

      return Ok(new EchoResult
      {
        Echo = $"{args.Knock}@{DateTime.Now:HH:mm:ss}",
      });
    }
    catch (Exception ex)
    {
      //return BadRequest("執行ＸＸＸ出現例外！" + ex.Message);
      throw new BadHttpRequestException("執行ＸＸＸ出現例外！" + ex.Message, 400, ex);
    }
  }

  [HttpPost]
  public EchoResult Echo2(EchoArgs args)
  {
    // 模擬執行失敗
    if (DateTime.Now.Second % 3 == 0)
    {
      throw new BadHttpRequestException("我是測試用錯誤訊息！", 400);
      // 等同 BadRequest("我是測試用錯誤訊息！" ... 再串接 Exception 的完整訊息);
      // 勉強可以使用。收到的 HttpStatusCode 預設為 400(Bad Request)。只是 Exception 的完整訊息也丟過來。
      // 也可指定送回來的 HttpStatusCode ，預設值為 400。

      //throw new HttpRequestException("我是測試用 HttpRequestException 錯誤訊息！", null, HttpStatusCode.BadRequest);
      // 不建議使用！就算指定了 HttpStatusCode 收到的一樣是 500(Internal Server Error) 這不能接受。

      // throw new ApplicationException("我是測試用錯誤訊息！");
      // 不建議使用！收到的 HttpStatusCode 一定是 500(Internal Server Error) 這不能接受。
    }

    return new EchoResult
    {
      Echo = $"{args.Knock}@{DateTime.Now:HH:mm:ss}",
      // 等同 Ok(new EchoResult);
    };
  }

  [HttpPost]
  [SwaggerResponse(200, Type = typeof(EchoResult))]
  [SwaggerResponse(400, Type = typeof(string))]
  public IActionResult Echo3([FromBody] EchoArgs args)
  {
    // 模擬執行失敗
    if (DateTime.Now.Second % 3 == 0)
    {
      return BadRequest("我是測試用錯誤訊息！");
    }

    return Ok(new EchoResult
    {
      Echo = $"{args.Knock}@{DateTime.Now:HH:mm:ss}",
    });
  }

  [HttpPost]
  public ActionResult<LoginResult> SignIn(LoginArgs login)
  {
    // 模擬長時間運算
    SpinWait.SpinUntil(() => false, 2000);

    if (!_account.Authenticate(login))
      return Unauthorized();

    var authUser = _account.Authorize(login.userId);
    if (authUser == null)
      return Unauthorized();

    var token = _account.GenerateJwtToken(authUser);

    return Ok(new LoginResult
    {
      LoginUserId = authUser.UserId,
      LoginUserName = authUser.UserName,
      ExpiredTime = authUser.ExpiresUtc.ToLocalTime(),
      AuthToken = token
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
    return Ok(new ErrMsg
    {
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
}
