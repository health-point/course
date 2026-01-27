using CMQuiz.Domain.Entities;

namespace CMQuiz.Application.Requests;

/// <summary>
/// Application request model for a select-type quiz item with multiple choice options.
/// </summary>
public sealed record QuizItemRequestSelect : QuizItemRequest
{
    /// <summary>
    /// Returns QuizItemType.Select as the type for this quiz item.
    /// </summary>
    public override QuizItemType Type => QuizItemType.Select;

    /// <summary>
    /// The list of available options that users can choose from when answering this quiz item.
    /// </summary>
    public required IReadOnlyList<string> Options { get; init; }
}
