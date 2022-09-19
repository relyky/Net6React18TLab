namespace Net6React18TLab.Models;

/// <summary>
/// 設計送回前端的訊息
/// </summary>
public record ErrMsg
{
  // 資源:參考自 sweetalert2
  public static string success = "success";
  public static string error = "error";
  public static string warning = "warning";
  public static string info = "info";

  public string type { get; set; } = ErrMsg.error;
  public string message { get;set; } = "預設失敗。";
  public string name => "ErrMsg";
}
