using System.Security.Cryptography;
using System.Text;
using CMQuiz.Application.Interfaces;
using CMQuiz.Application.Requests;
using CMQuiz.Domain.Repositories;

namespace CMQuiz.Application.UseCases;

/// <summary>
/// Use case implementation for registering new user accounts.
/// </summary>
public class RegisterUseCase(IUserRepository userRepository) : IRegisterUseCase
{
    /// <summary>
    /// Registers a new user account after validating username uniqueness and hashing the password.
    /// </summary>
    public async Task<Domain.Entities.User> ExecuteAsync(RegisterRequest request)
    {
        var existingUser = await userRepository.GetByUsernameAsync(request.Username);
        if (existingUser != null)
        {
            throw new InvalidOperationException("Username already exists");
        }

        var passwordHash = HashPassword(request.Password);
        
        var user = new Domain.Entities.User
        {
            Id = 0,
            Username = request.Username,
            PasswordHash = passwordHash
        };

        return await userRepository.CreateAsync(user);
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
