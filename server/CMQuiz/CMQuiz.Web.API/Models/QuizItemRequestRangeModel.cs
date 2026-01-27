namespace CMQuiz.Web.API.Models;

/// <summary>
/// Request model for creating a range-type quiz item that requires a numeric value within a specified range.
/// Inherits from QuizItemRequestModel and specifies the range type discriminator.
/// </summary>
public sealed record QuizItemRequestRangeModel : QuizItemRequestModel
{
    /// <summary>
    /// Returns "range" as the type discriminator for this quiz item request type.
    /// </summary>
    public override string Type => "range";

    /// <summary>
    /// The minimum allowed value for the range input.
    /// </summary>
    public required int Min { get; init; }

    /// <summary>
    /// The maximum allowed value for the range input.
    /// </summary>
    public required int Max { get; init; }
}
