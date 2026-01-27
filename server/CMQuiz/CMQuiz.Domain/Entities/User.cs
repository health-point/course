namespace CMQuiz.Domain.Entities;

/// <summary>
/// Represents a user entity with authentication credentials.
/// </summary>
public sealed record User
{
    public required int Id { get; init; }
    public required string Username { get; init; } = string.Empty;
    public required string PasswordHash { get; init; } = string.Empty;
}
