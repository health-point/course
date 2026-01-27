namespace CMQuiz.Domain.Entities;

/// <summary>
/// Base abstract record for polymorphic quiz item entities. Concrete implementations represent different question types.
/// </summary>
public abstract record QuizItem
{
    public required int Id { get; init; }
    public required int QuizId { get; init; }
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required QuizItemType Type { get; init; }
}
