using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Net6React18TLab.Models;

/// <summary>
/// 取得現在使用者授權明細
/// </summary>
interface IAuthUser
{
  AuthUser GetCurrentUser();
}

/// <summary>
/// 使用者授權明細(no public)
/// </summary>
record AuthUser
{
  public string UserId { get; init; } = String.Empty;
  public string UserName { get; init; } = String.Empty;
  public string[] Roles { get; init; } = new string[0];
  public Guid AuthGuid { get; init; }
  public DateTimeOffset IssuedUtc { get; init; }
  public DateTimeOffset ExpiresUtc { get; init; }
  public string ClientIp { get; init; } = String.Empty;

  /// <summary>
  /// 授權功能選單
  /// </summary>
  public MenuInfo AuthMenu { get; init; } = new();

  /// <summary>
  /// 授權功能清單
  /// </summary>
  public string[] AuthFuncList() => AuthMenu.groupList.SelectMany(g => g.funcList, (g, f) => f.funcId).ToArray();
}

class MenuInfo
{
  public List<MenuGroup> groupList { get; set; } = new List<MenuGroup>();

  public MenuGroup AddMenuGroup(MenuGroup menuGroup)
  {
    groupList.Add(menuGroup);
    return menuGroup;
  }
}

class MenuGroup
{
  public string groupName { get; set; } = String.Empty;
  public string groupId { get; set; } = String.Empty;
  public List<MenuItem> funcList { get; set; } = new List<MenuItem>();

  public MenuGroup AddMenuItem(MenuItem item)
  {
    funcList.Add(item);
    return this;
  }
}

class MenuItem
{
  public string funcId { get; set; } = String.Empty;
  public string funcName { get; set; } = String.Empty;
  public string url { get; set; } = String.Empty;
  public string tip { get; set; } = String.Empty;
}
