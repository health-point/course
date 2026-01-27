using CMQuiz.Domain.Entities;

namespace CMQuiz.Application.Requests;

/// <summary>
/// Application request model for a range-type quiz item that requires a numeric value within a specified range.
/// </summary>
public sealed record QuizItemRequestRange : QuizItemRequest
{
    /// <summary>
    /// Returns QuizItemType.Range as the type for this quiz item.
    /// </summary>
    public override QuizItemType Type => QuizItemType.Range;

    /// <summary>
    /// The minimum allowed value for the range input.
    /// </summary>
    public required int Min { get; init; }

    /// <summary>
    /// The maximum allowed value for the range input.
    /// </summary>
    public required int Max { get; init; }
}
