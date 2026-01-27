using System.Security.Cryptography;
using System.Text;
using CMQuiz.Application.Interfaces;
using CMQuiz.Application.Requests;
using CMQuiz.Domain.Repositories;
using CMQuiz.Infrastructure.Services;

namespace CMQuiz.Application.UseCases;

/// <summary>
/// Use case implementation for authenticating users and creating sessions.
/// </summary>
public class LoginUseCase(IUserRepository userRepository, ISessionService sessionService) : ILoginUseCase
{
    /// <summary>
    /// Authenticates a user by validating credentials and creates a session if successful.
    /// </summary>
    public async Task<string?> ExecuteAsync(LoginRequest request)
    {
        var user = await userRepository.GetByUsernameAsync(request.Username);
        if (user == null)
        {
            return null;
        }

        var passwordHash = HashPassword(request.Password);
        if (passwordHash != user.PasswordHash)
        {
            return null;
        }

        var sessionId = sessionService.CreateSession(user.Id);
        return sessionId;
    }

    /// <summary>
    /// Hashes a password using SHA256 algorithm and returns base64 encoded result.
    /// </summary>
    /// <param name="password">The plain text password to hash.</param>
    /// <returns>Base64 encoded hash of the password.</returns>
    private static string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(password);
        var hash = sha256.ComputeHash(bytes);
        return Convert.ToBase64String(hash);
    }
}
