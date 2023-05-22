using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Net6React18TLab.Dto.Account;
using Net6React18TLab.Models;
using Net6React18TLab.Services;
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
        _logger.LogError("這是邏輯錯誤。");
        return BadRequest("這是邏輯錯誤。");
      }

      // 模擬出現預期之外的例外
      if (DateTime.Now.Second % 3 == 0)
      {
        throw new ApplicationException("這是例外訊息！");
      }

      // success
      _logger.LogInformation("這是成功訊息。");
      return Ok(new EchoResult
      {
        Echo = $"{args.Knock}@{DateTime.Now:HH:mm:ss}",
      });
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "執行ＸＸＸ出現例外！" + ex.Message);
      return BadRequest("執行ＸＸＸ出現例外！" + ex.Message);
      // throw new BadHttpRequestException("執行ＸＸＸ出現例外！" + ex.Message, ex); // 送回完整的例外訊息。
    }
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
