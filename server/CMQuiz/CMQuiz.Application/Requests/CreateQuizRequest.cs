namespace CMQuiz.Application.Requests;

/// <summary>
/// Application request model for creating a new quiz. Contains quiz metadata and polymorphic quiz items.
/// </summary>
public sealed record CreateQuizRequest
{
    /// <summary>
    /// The name or title for the new quiz.
    /// </summary>
    public required string Name { get; init; }

    /// <summary>
    /// A detailed description of the quiz content and purpose.
    /// </summary>
    public required string Description { get; init; }

    /// <summary>
    /// The list of quiz items to include in the quiz. Items are polymorphic and can be of different types (select, text, range).
    /// </summary>
    public required IReadOnlyList<QuizItemRequest> Items { get; init; }
}
