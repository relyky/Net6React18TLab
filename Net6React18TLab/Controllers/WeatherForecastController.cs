using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Net6React18TLab.Models;

namespace Net6React18TLab.Controllers
{
  [ApiController]
  [Route("api/[controller]/[action]")]
  public class WeatherForecastController : ControllerBase
  {
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
      _logger = logger;
    }

    [HttpPost]
    [Authorize]
    public IEnumerable<WeatherForecast> QryDataList(QryDataListArgs args)
    {
      // 模擬長時間計算
      SpinWait.SpinUntil(() => false, 2000); // 等二秒

      return Enumerable.Range(1, args.rowCount).Select(index => new WeatherForecast
      {
        Date = DateTime.Now.AddDays(index),
        TemperatureC = Random.Shared.Next(-20, 55),
        Summary = args.summary == "all" ? Summaries[Random.Shared.Next(Summaries.Length)] : args.summary
      })
      .ToArray();
    }

    [HttpPost]
    public IEnumerable<string> GetBasicData()
    {
      return Summaries;
    }

    public record QryDataListArgs
    {
      public int rowCount { get; set; }
      public string summary { get; set; } = String.Empty;
    }
  }
}