namespace CMQuiz.Application.Requests;

/// <summary>
/// Application request model for user authentication. Contains login credentials.
/// </summary>
public sealed record LoginRequest
{
    /// <summary>
    /// The username of the user attempting to authenticate.
    /// </summary>
    public required string Username { get; init; }

    /// <summary>
    /// The plain text password of the user. Will be hashed and compared with stored password hash.
    /// </summary>
    public required string Password { get; init; }
}
