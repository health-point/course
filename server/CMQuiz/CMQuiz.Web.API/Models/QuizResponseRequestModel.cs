namespace CMQuiz.Web.API.Models;

/// <summary>
/// Request model for submitting a quiz response. Contains answers mapped by quiz item identifiers.
/// </summary>
public sealed record QuizResponseRequestModel
{
    /// <summary>
    /// Dictionary mapping quiz item identifiers to their corresponding answer values.
    /// Answer values can be of different types depending on the quiz item type (string for text, int for range, int/string for select).
    /// </summary>
    public required IReadOnlyDictionary<int, object> Answers { get; init; }
}
