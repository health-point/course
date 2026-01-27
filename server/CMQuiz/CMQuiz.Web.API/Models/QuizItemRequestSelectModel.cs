namespace CMQuiz.Web.API.Models;

/// <summary>
/// Request model for creating a select-type quiz item with multiple choice options.
/// Inherits from QuizItemRequestModel and specifies the select type discriminator.
/// </summary>
public sealed record QuizItemRequestSelectModel : QuizItemRequestModel
{
    /// <summary>
    /// Returns "select" as the type discriminator for this quiz item request type.
    /// </summary>
    public override string Type => "select";

    /// <summary>
    /// The list of available options that users can choose from when answering this quiz item.
    /// </summary>
    public required IReadOnlyList<string> Options { get; init; }
}
