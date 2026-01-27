namespace CMQuiz.Web.API.Models;

/// <summary>
/// Response model representing a submitted quiz response with user answers.
/// </summary>
public sealed record QuizResponseModel
{
    /// <summary>
    /// The unique identifier of the quiz response.
    /// </summary>
    public required int Id { get; init; }

    /// <summary>
    /// The unique identifier of the quiz that this response is for.
    /// </summary>
    public required int QuizId { get; init; }

    /// <summary>
    /// The unique identifier of the user who submitted this response.
    /// </summary>
    public required int UserId { get; init; }

    /// <summary>
    /// Dictionary mapping quiz item identifiers to their corresponding answer values.
    /// Answer values can be of different types depending on the quiz item type.
    /// </summary>
    public required Dictionary<int, object> Answers { get; init; }
}
