namespace CMQuiz.Application.Requests;

/// <summary>
/// Application request model for submitting a quiz response. Contains answers mapped by quiz item identifiers.
/// </summary>
public sealed record QuizResponseRequest
{
    /// <summary>
    /// The unique identifier of the quiz that this response is for.
    /// </summary>
    public required int QuizId { get; init; }

    /// <summary>
    /// Dictionary mapping quiz item identifiers to their corresponding answer values.
    /// Answer values can be of different types depending on the quiz item type (string for text, int for range, int/string for select).
    /// </summary>
    public required IReadOnlyDictionary<int, object> Answers { get; init; }
}
