using CMQuiz.Domain.Entities;

namespace CMQuiz.Application.Requests;

/// <summary>
/// Application request model for a text-type quiz item that requires a free-form text response.
/// </summary>
public sealed record QuizItemRequestText : QuizItemRequest
{
    /// <summary>
    /// Returns QuizItemType.Text as the type for this quiz item.
    /// </summary>
    public override QuizItemType Type => QuizItemType.Text;

    /// <summary>
    /// The placeholder text to display in the text input field as a hint to the user.
    /// </summary>
    public required string Placeholder { get; init; }
}
