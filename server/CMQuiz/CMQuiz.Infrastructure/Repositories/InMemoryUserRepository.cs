using CMQuiz.Domain.Entities;
using CMQuiz.Domain.Repositories;

namespace CMQuiz.Infrastructure.Repositories;

/// <summary>
/// In-memory implementation of user repository using dictionary storage.
/// Provides operations for user lookup by username or identifier and user creation.
/// Data is stored in memory and will be lost on application restart.
/// </summary>
public class InMemoryUserRepository : IUserRepository
{
    private readonly Dictionary<string, User> _usersByUsername = new();
    private readonly Dictionary<int, User> _usersById = new();
    private int _nextId = 1;

    /// <summary>
    /// Retrieves a user entity by username from the in-memory dictionary.
    /// </summary>
    public Task<User?> GetByUsernameAsync(string username)
    {
        _usersByUsername.TryGetValue(username, out var user);
        return Task.FromResult(user);
    }

    /// <summary>
    /// Creates a new user entity, assigns a unique identifier, and stores it in both dictionaries.
    /// </summary>
    public Task<User> CreateAsync(User user)
    {
        var id = _nextId++;
        var userWithId = user with { Id = id };
        _usersByUsername[userWithId.Username] = userWithId;
        _usersById[userWithId.Id] = userWithId;
        return Task.FromResult(userWithId);
    }

    /// <summary>
    /// Retrieves a user entity by its unique identifier from the in-memory dictionary.
    /// </summary>
    public Task<User?> GetByIdAsync(int id)
    {
        _usersById.TryGetValue(id, out var user);
        return Task.FromResult(user);
    }
}
