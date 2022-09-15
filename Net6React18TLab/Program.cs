using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Net6React18TLab.Models;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var _config = builder.Configuration;

//## Add services to the container.

builder.Services.AddControllersWithViews();

/// 使用 Token-based 身份認證與授權 (JWT),ref→[https://blog.miniasp.com/post/2022/02/13/How-to-use-JWT-token-based-auth-in-aspnet-core-60]
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
      // 當驗證失敗時，回應標頭會包含 WWW-Authenticate 標頭，這裡會顯示失敗的詳細錯誤原因
      options.IncludeErrorDetails = true; // 預設值為 true，有時會特別關閉

      options.TokenValidationParameters = new TokenValidationParameters
      {
        // 透過這項宣告，就可以從 "sub" 取值並設定給 User.Identity.Name
        NameClaimType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
        // 透過這項宣告，就可以從 "roles" 取值，並可讓 [Authorize] 判斷角色
        RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",

        // 一般我們都會驗證 Issuer
        ValidateIssuer = true,
        ValidIssuer = _config["JwtSettings:Issuer"],

        // 通常不太需要驗證 Audience
        ValidateAudience = false,
        //ValidAudience = "JwtAuthDemo", // 不驗證就不需要填寫

        // 一般我們都會驗證 Token 的有效期間
        ValidateLifetime = true,

        // 如果 Token 中包含 key 才需要驗證，一般都只有簽章而已
        ValidateIssuerSigningKey = false,

        // "1234567890123456" 應該從 IConfiguration 取得
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["JwtSettings:SignKey"]))
      };
    });

builder.Services.AddAuthorization(options => {
  options.AddPolicy("AuthFunc", policy => policy.Requirements.Add(new AuthFuncRequirement()));
});

// 註冊Requirement
builder.Services.AddSingleton<IAuthorizationHandler, AuthFuncHandler>();

//=============================================================================
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
  // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
  app.UseHsts(); // 強制使用HTTPS協定
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
