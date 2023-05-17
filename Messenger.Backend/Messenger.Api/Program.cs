using System.Reflection;
using System.Text;
using Messenger.Application.CommandHandlers.Authenticate;
using Messenger.Application.Gatekeepers;
using Messenger.Application.Services;
using Messenger.Backend.ChatHub;
using Messenger.Backend.Extensions;
using Messenger.Backend.Mapping;
using Messenger.Core.Configurations;
using Messenger.Core.Interfaces;
using Messenger.Database.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


// Configure db context
builder.Services.AddDbContextFactory<MessengerContext>(
    options => options.UseSqlServer(
        builder.Configuration.GetConnectionString("AppConnectionString"),
        b => b.MigrationsAssembly("Messenger.Database")),
    ServiceLifetime.Scoped);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var jwtConfiguration = new JwtConfiguration();
builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
builder.Configuration.GetSection("Jwt").Bind(jwtConfiguration);
builder.Services.AddSingleton(jwtConfiguration);
builder.Services.AddAutoMapper(typeof(UserMapper).GetTypeInfo().Assembly);
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IPasswordService, PasswordHasherService>();
builder.Services.AddScoped<ISecurityContext, SecurityContextService>();
builder.Services.AddScoped<IAsymmetricEncryptionService, AsymmetricEncryptionService>();
builder.Services.AddScoped<ISymmetricEncryptionService, SymmetricEncryptionService>();
builder.Services.AddScoped<ICryptoService, RsaHybridEncryptionService>();
builder.Services.AddScoped<IRoomGatekeeper, RoomGatekeeper>();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddSignalR();
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssemblyContaining<AuthenticateCommandHandler>());
builder.Services
    .AddMemoryCache()
    .AddAuthorization()
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateActor = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtConfiguration.Issuer,
            ValidAudience = jwtConfiguration.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfiguration.Key)),
        };
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];

                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) &&
                    path.StartsWithSegments("/chatHub"))
                {
                    context.Token = accessToken;
                }

                return Task.CompletedTask;
            },
        };
    });

builder.Services.AddAuthorization();
builder.ConfigureSwagger();


var app = builder.Build();

app.UseRouting();
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(x =>
{
    x.AllowAnyMethod()
        .AllowAnyHeader()
        .WithOrigins(builder.Configuration.GetSection("AllowedOrigins")
            .Get<string[]>())
        .AllowCredentials();
});


app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<HubContext>("/chatHub");
    endpoints.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");
});
app.MapControllers();

app.Run();