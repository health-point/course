using CMQuiz.Domain.Entities;

namespace CMQuiz.Domain.Repositories;

/// <summary>
/// Repository interface for managing user entities. Provides operations for user lookup and creation.
/// </summary>
public interface IUserRepository
{
    /// <summary>
    /// Retrieves a user entity by username.
    /// </summary>
    /// <param name="username">The username to search for.</param>
    /// <returns>The user entity if found, otherwise null.</returns>
    Task<User?> GetByUsernameAsync(string username);

    /// <summary>
    /// Creates a new user entity in the repository and assigns a unique identifier.
    /// </summary>
    /// <param name="user">The user entity to create. The identifier will be assigned by the repository.</param>
    /// <returns>The created user entity with assigned identifier.</returns>
    Task<User> CreateAsync(User user);

    /// <summary>
    /// Retrieves a user entity by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the user.</param>
    /// <returns>The user entity if found, otherwise null.</returns>
    Task<User?> GetByIdAsync(int id);
}
