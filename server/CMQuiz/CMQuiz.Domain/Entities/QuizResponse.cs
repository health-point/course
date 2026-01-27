namespace CMQuiz.Domain.Entities;

/// <summary>
/// Represents a user's response to a quiz with answers mapped by quiz item identifiers.
/// </summary>
public sealed record QuizResponse
{
    public required int Id { get; init; }
    public required int QuizId { get; init; }
    public required int UserId { get; init; }
    public required Dictionary<int, object> Answers { get; init; } = new();
}
