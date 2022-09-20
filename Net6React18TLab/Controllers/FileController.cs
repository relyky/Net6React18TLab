using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Primitives;
using System.Net;
using System.Net.Mail;

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
  public IActionResult DownloadFile()
  {
    // [https://blog.miniasp.com/post/2019/12/08/Understanding-File-Providers-in-ASP-NET-Core-and-Download-Physical-File](https://blog.miniasp.com/post/2019/12/08/Understanding-File-Providers-in-ASP-NET-Core-and-Download-Physical-File)

    FileInfo fi = new FileInfo(@"Template/MinIO 評估.docx");
    byte[] blob = System.IO.File.ReadAllBytes(fi.FullName);
    return File(blob, System.Net.Mime.MediaTypeNames.Application.Octet);
  }

}
