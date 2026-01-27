using CMQuiz.Application.Requests;

namespace CMQuiz.Application.Interfaces;

/// <summary>
/// Use case interface for registering a new user account.
/// </summary>
public interface IRegisterUseCase
{
    /// <summary>
    /// Registers a new user account with the provided credentials.
    /// </summary>
    /// <param name="request">The registration request containing username and password.</param>
    /// <returns>The created user entity with assigned identifier and hashed password.</returns>
    /// <exception cref="InvalidOperationException">Thrown when the username already exists in the system.</exception>
    Task<Domain.Entities.User> ExecuteAsync(RegisterRequest request);
}
