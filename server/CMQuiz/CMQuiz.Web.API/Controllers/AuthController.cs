using CMQuiz.Application.Interfaces;
using CMQuiz.Infrastructure.Services;
using CMQuiz.Web.API.Attributes;
using CMQuiz.Web.API.Mappers;
using CMQuiz.Web.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace CMQuiz.Web.API.Controllers;

/// <summary>
/// Controller for handling user authentication operations including login, registration, logout, and session validation.
/// </summary>
[ApiController]
[Route("api/auth")]
public class AuthController(
    ILoginUseCase loginUseCase,
    IRegisterUseCase registerUseCase,
    ISessionService sessionService)
    : ControllerBase
{
    /// <summary>
    /// Authenticates a user and creates a session cookie.
    /// </summary>
    /// <param name="model">Login credentials containing username and password.</param>
    /// <returns>Success message if authentication succeeds, otherwise returns unauthorized status.</returns>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestModel model)
    {
        var request = QuizMapper.ToLoginRequest(model);
        var sessionId = await loginUseCase.ExecuteAsync(request);
        
        if (sessionId == null)
        {
            return Unauthorized(new { message = "Invalid username or password" });
        }

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            SameSite = SameSiteMode.Lax,
            Secure = false,
            Expires = DateTimeOffset.UtcNow.AddDays(7)
        };

        Response.Cookies.Append("sessionId", sessionId, cookieOptions);
        
        return Ok(new { message = "Login successful" });
    }

    /// <summary>
    /// Registers a new user account in the system.
    /// </summary>
    /// <param name="model">Registration data containing username and password.</param>
    /// <returns>Created user information if registration succeeds, otherwise returns conflict status.</returns>
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestModel model)
    {
        try
        {
            var request = QuizMapper.ToRegisterRequest(model);
            var user = await registerUseCase.ExecuteAsync(request);
            
            return Ok(new { id = user.Id, username = user.Username });
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    /// <summary>
    /// Logs out the current user by invalidating the session cookie.
    /// </summary>
    /// <returns>Success message indicating logout was successful.</returns>
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        var sessionId = Request.Cookies["sessionId"];
        if (!string.IsNullOrEmpty(sessionId))
        {
            sessionService.RemoveSession(sessionId);
        }

        Response.Cookies.Delete("sessionId");
        return Ok(new { message = "Logout successful" });
    }

    /// <summary>
    /// Retrieves information about the currently authenticated user.
    /// </summary>
    /// <returns>User identifier if authenticated, otherwise returns unauthorized status.</returns>
    [HttpGet("me")]
    [Authorize]
    public IActionResult GetMe()
    {
        var sessionId = Request.Cookies["sessionId"];
        if (string.IsNullOrEmpty(sessionId))
        {
            return Unauthorized();
        }

        var userId = sessionService.GetUserIdBySession(sessionId);
        if (userId == null)
        {
            return Unauthorized();
        }

        return Ok(new { userId = userId.Value });
    }
}

