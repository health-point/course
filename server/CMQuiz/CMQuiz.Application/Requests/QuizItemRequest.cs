namespace CMQuiz.Application.Requests;

/// <summary>
/// Base abstract record for polymorphic quiz item request models used in application layer.
/// Concrete implementations specify the type and additional properties for each quiz item type.
/// </summary>
public abstract record QuizItemRequest
{
    public required string Title { get; init; }
    public required string Description { get; init; }
    /// <summary>
    /// The type of quiz item. Determines which concrete implementation should be used.
    /// </summary>
    public abstract Domain.Entities.QuizItemType Type { get; }
}
