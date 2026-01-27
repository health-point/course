using CMQuiz.Application.Requests;

namespace CMQuiz.Application.Interfaces;

/// <summary>
/// Use case interface for authenticating a user and creating a session.
/// </summary>
public interface ILoginUseCase
{
    /// <summary>
    /// Authenticates a user with provided credentials and creates a session if authentication succeeds.
    /// </summary>
    /// <param name="request">The login request containing username and password.</param>
    /// <returns>Session identifier if authentication succeeds, otherwise null.</returns>
    Task<string?> ExecuteAsync(LoginRequest request);
}
