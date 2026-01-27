namespace CMQuiz.Domain.Entities;

/// <summary>
/// Represents a quiz entity containing metadata and associated quiz items.
/// </summary>
public sealed record Quiz
{
    public required int Id { get; init; }
    public required string Name { get; init; }
    public required string Description { get; init; }
    public required List<QuizItem> Items { get; init; } = new();
}
