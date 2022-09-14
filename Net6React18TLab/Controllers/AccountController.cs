using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace Net6React18TLab.Controllers
{
  [ApiController]
  [Route("api/[controller]/[action]")]
  public class AccountController : ControllerBase
  {
    readonly ILogger<AccountController> _logger;
    readonly IHttpContextAccessor _http;

    public AccountController(ILogger<AccountController> logger, IHttpContextAccessor http)
    {
      _logger = logger;
      _http = http;
    }

    [HttpPost]
    public IActionResult Echo(EchoArgs args)
    {
      return Ok(new {
        message = $"{args.knock}@{DateTime.Now:HH:mm:ss}",
        hasHttpContext = _http.HttpContext != null,
        userName = _http.HttpContext?.User.Identity?.Name ?? "unknown"
      });
    }

    public record EchoArgs
    {
      public string knock { get; set; } = String.Empty;
    }
  }
}
