namespace CMQuiz.Domain.Entities;

/// <summary>
/// Represents a select-type quiz item that presents multiple choice options to users.
/// </summary>
public sealed record QuizItemSelect : QuizItem
{
    public required List<string> Options { get; init; } = new();
}
