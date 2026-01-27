namespace CMQuiz.Web.API.Models;

/// <summary>
/// Request model for user registration. Contains account creation credentials.
/// </summary>
public sealed record RegisterRequestModel
{
    /// <summary>
    /// The desired username for the new account. Must be unique within the system.
    /// </summary>
    public required string Username { get; init; }

    /// <summary>
    /// The plain text password for the new account. Will be hashed before storage.
    /// </summary>
    public required string Password { get; init; }
}
