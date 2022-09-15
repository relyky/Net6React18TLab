using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Controllers;
using System.Diagnostics;
using System.Reflection;
using System.Security.Claims;

namespace Net6React18TLab.Models;

[AttributeUsage(AttributeTargets.Class)]
public class AuthFuncAttribute : Attribute
{
  public AuthFuncAttribute(string funcCode) { }
}

class AuthFuncRequirement : IAuthorizationRequirement
{

}

// 實作 handler
class AuthFuncHandler : AuthorizationHandler<AuthFuncRequirement>
{
  protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, AuthFuncRequirement requirement)
  {
    //# 未登入離開。
    if (!context.User.Identity?.IsAuthenticated ?? false)
      return Task.CompletedTask;

    //# 取得需要資源，若非預期資源離開。
    var http = context.Resource as DefaultHttpContext;
    if (http == null) return Task.CompletedTask;
    var endpoint = http.GetEndpoint();
    if (endpoint == null) return Task.CompletedTask;
    var descriptor = endpoint.Metadata.GetMetadata<ControllerActionDescriptor>();
    if (descriptor == null) return Task.CompletedTask;

    //# 取得客製資源
    // 功能代碼：預設為Controller名稱。 
    string? funcCode = descriptor.ControllerName; 
    // 但若用 AuthFuncAttribute 指定[功能代碼]則為優先。 
    CustomAttributeData? authFunc = descriptor.ControllerTypeInfo.CustomAttributes.FirstOrDefault(c => c.AttributeType == typeof(AuthFuncAttribute));
    if (authFunc != null && authFunc.ConstructorArguments.Count > 0)
      funcCode = authFunc.ConstructorArguments[0].Value as string;

    //# 取得登入者的授權資料
    //const userAuthData = ...

    //# 開始驗證
    // 是否登入者有授權的功能清單。
    if(!InAuthFuncList(context.User, funcCode)) return Task.CompletedTask;

    // OK
    context.Succeed(requirement);
    return Task.CompletedTask;
  }

  /// <summary>
  /// help funciton: 有否在登入者的授權功能清單中
  /// </summary>
  bool InAuthFuncList(ClaimsPrincipal user, string? funcCode)
  {
    if (funcCode == null) return false;
    return true;
  }
}
