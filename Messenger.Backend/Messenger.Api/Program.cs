using Messenger.Backend.Extensions;
using Messenger.Database.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure db context
builder.Services.AddDbContextFactory<MessengerContext>(
    options => options.UseSqlServer(
        builder.Configuration.GetConnectionString("AppConnectionString"),
        b => b.MigrationsAssembly("Messenger.Database")),
    ServiceLifetime.Scoped);

// Configure services
builder.ConfigureServices();
builder.ConfigureSwagger();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

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

app.MapControllers();

app.Run();