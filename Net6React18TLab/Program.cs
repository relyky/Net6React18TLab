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

/// �ϥ� Token-based �����{�һP���v (JWT),ref��[https://blog.miniasp.com/post/2022/02/13/How-to-use-JWT-token-based-auth-in-aspnet-core-60]
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
      // �����ҥ��ѮɡA�^�����Y�|�]�t WWW-Authenticate ���Y�A�o�̷|��ܥ��Ѫ��Բӿ��~��]
      options.IncludeErrorDetails = true; // �w�]�Ȭ� true�A���ɷ|�S�O����

      options.TokenValidationParameters = new TokenValidationParameters
      {
        // �z�L�o���ŧi�A�N�i�H�q "sub" ���Ȩó]�w�� User.Identity.Name
        NameClaimType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
        // �z�L�o���ŧi�A�N�i�H�q "roles" ���ȡA�åi�� [Authorize] �P�_����
        RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",

        // �@��ڭ̳��|���� Issuer
        ValidateIssuer = true,
        ValidIssuer = _config["JwtSettings:Issuer"],

        // �q�`���ӻݭn���� Audience
        ValidateAudience = false,
        //ValidAudience = "JwtAuthDemo", // �����ҴN���ݭn��g

        // �@��ڭ̳��|���� Token �����Ĵ���
        ValidateLifetime = true,

        // �p�G Token ���]�t key �~�ݭn���ҡA�@�볣�u��ñ���Ӥw
        ValidateIssuerSigningKey = false,

        // "1234567890123456" ���ӱq IConfiguration ���o
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["JwtSettings:SignKey"]))
      };
    });

builder.Services.AddAuthorization(options => {
  options.AddPolicy("AuthFunc", policy => policy.Requirements.Add(new AuthFuncRequirement()));
});

// ���URequirement
builder.Services.AddSingleton<IAuthorizationHandler, AuthFuncHandler>();

//=============================================================================
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
  // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
  app.UseHsts(); // �j��ϥ�HTTPS��w
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
