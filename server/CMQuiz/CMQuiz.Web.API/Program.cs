using CMQuiz.Application.Interfaces;
using CMQuiz.Application.UseCases;
using CMQuiz.Infrastructure;
using Microsoft.OpenApi.Models;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "CMQuiz API",
        Version = "v1",
        Description = "RESTful API for managing quizzes, quiz items, and user responses. Supports polymorphic quiz item types and cookie-based authentication."
    });

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }

    c.UseAllOfForInheritance();
    c.UseOneOfForPolymorphism();
});

builder.Services.AddInfrastructure();
builder.Services.AddScoped<CMQuiz.Web.API.Filters.AuthorizeFilter>();

builder.Services.AddScoped<ICreateQuizUseCase, CreateQuizUseCase>();
builder.Services.AddScoped<IGetQuizUseCase, GetQuizUseCase>();
builder.Services.AddScoped<IGetQuizzesUseCase, GetQuizzesUseCase>();
builder.Services.AddScoped<ISubmitQuizResponseUseCase, SubmitQuizResponseUseCase>();
builder.Services.AddScoped<IGetQuizResponsesUseCase, GetQuizResponsesUseCase>();
builder.Services.AddScoped<ILoginUseCase, LoginUseCase>();
builder.Services.AddScoped<IRegisterUseCase, RegisterUseCase>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173", "http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "CMQuiz API v1");
});

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
