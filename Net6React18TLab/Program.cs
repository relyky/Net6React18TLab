var builder = WebApplication.CreateBuilder(args);

//## Add services to the container.

/// �q�ۭq���󤤨ϥ� HttpContext, ref��[https://docs.microsoft.com/zh-tw/aspnet/core/fundamentals/http-context?view=aspnetcore-6.0]
/// �N�i�`�J�GIHttpContextAccessor�A�H���oHttpContext�C
builder.Services.AddHttpContextAccessor();

builder.Services.AddControllersWithViews();

//=============================================================================
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
  // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
  app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
