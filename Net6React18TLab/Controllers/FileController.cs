using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Primitives;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace Net6React18TLab.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class FileController : ControllerBase
{
  [HttpPost]
  [DisableRequestSizeLimit]
  public IActionResult UploadFile()
  {
    throw new NotImplementedException();
  }

  [HttpPost]
  public FileResult DownloadFile()
  {
    // [認識 ASP․NET Core 檔案提供者與透過 Web API 下載實體檔案](https://blog.miniasp.com/post/2019/12/08/Understanding-File-Providers-in-ASP-NET-Core-and-Download-Physical-File)

    FileInfo fi = new FileInfo(@"Template/MinIO 評估.docx");
    byte[] blob = System.IO.File.ReadAllBytes(fi.FullName);
    return File(blob, System.Net.Mime.MediaTypeNames.Application.Octet, fi.Name);
  }

}
