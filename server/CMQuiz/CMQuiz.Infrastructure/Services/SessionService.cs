namespace CMQuiz.Infrastructure.Services;

/// <summary>
/// Service interface for managing user sessions. Provides operations for creating, retrieving, and removing sessions.
/// </summary>
public interface ISessionService
{
    /// <summary>
    /// Creates a new session for the specified user and returns the session identifier.
    /// </summary>
    /// <param name="userId">The unique identifier of the user to create a session for.</param>
    /// <returns>A unique session identifier (GUID) that can be used to authenticate subsequent requests.</returns>
    string CreateSession(int userId);

    /// <summary>
    /// Retrieves the user identifier associated with a session identifier.
    /// </summary>
    /// <param name="sessionId">The session identifier to look up.</param>
    /// <returns>The user identifier if the session exists, otherwise null.</returns>
    int? GetUserIdBySession(string sessionId);

    /// <summary>
    /// Removes a session from the system, effectively logging out the user.
    /// </summary>
    /// <param name="sessionId">The session identifier to remove.</param>
    void RemoveSession(string sessionId);
}

/// <summary>
/// In-memory implementation of session service using dictionary storage.
/// Sessions are stored in memory and will be lost on application restart.
/// </summary>
public class SessionService : ISessionService
{
    private readonly Dictionary<string, int> _sessions = new();

    /// <summary>
    /// Creates a new session by generating a unique GUID and associating it with the user identifier.
    /// </summary>
    public string CreateSession(int userId)
    {
        var sessionId = Guid.NewGuid().ToString();
        _sessions[sessionId] = userId;
        return sessionId;
    }

    /// <summary>
    /// Looks up the user identifier associated with the provided session identifier.
    /// </summary>
    public int? GetUserIdBySession(string sessionId)
    {
        _sessions.TryGetValue(sessionId, out var userId);
        return userId;
    }

    /// <summary>
    /// Removes the session from the dictionary, invalidating the session identifier.
    /// </summary>
    public void RemoveSession(string sessionId)
    {
        _sessions.Remove(sessionId);
    }
}
