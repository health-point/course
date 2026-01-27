namespace CMQuiz.Domain.Entities;

/// <summary>
/// Represents a range-type quiz item that requires a numeric value within a specified range.
/// </summary>
public sealed record QuizItemRange : QuizItem
{
    public required int Min { get; init; }
    public required int Max { get; init; }
}
