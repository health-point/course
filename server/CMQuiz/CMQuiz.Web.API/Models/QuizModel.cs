namespace CMQuiz.Web.API.Models;

/// <summary>
/// Represents a quiz entity in API responses. Contains quiz metadata and associated quiz items.
/// </summary>
public sealed record QuizModel
{
    /// <summary>
    /// The unique identifier of the quiz.
    /// </summary>
    public required int Id { get; init; }

    /// <summary>
    /// The name or title of the quiz.
    /// </summary>
    public required string Name { get; init; }

    /// <summary>
    /// A detailed description of the quiz content and purpose.
    /// </summary>
    public required string Description { get; init; }

    /// <summary>
    /// The list of quiz items (questions) associated with this quiz. Items are polymorphic and can be of different types.
    /// </summary>
    public required IReadOnlyList<QuizItemModel> Items { get; init; }
}
