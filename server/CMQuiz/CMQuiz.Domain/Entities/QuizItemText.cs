namespace CMQuiz.Domain.Entities;

/// <summary>
/// Represents a text-type quiz item that requires a free-form text response from users.
/// </summary>
public sealed record QuizItemText : QuizItem
{
    public required string Placeholder { get; init; } = string.Empty;
}
