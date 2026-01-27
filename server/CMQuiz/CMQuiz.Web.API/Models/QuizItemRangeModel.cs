namespace CMQuiz.Web.API.Models;

/// <summary>
/// Represents a range-type quiz item that requires a numeric value within a specified range.
/// </summary>
public sealed record QuizItemRangeModel : QuizItemModel
{
    /// <summary>
    /// Returns "range" as the type discriminator for this quiz item type.
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
