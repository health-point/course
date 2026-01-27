namespace CMQuiz.Web.API.Models;

/// <summary>
/// Request model for creating a text-type quiz item that requires a free-form text response.
/// Inherits from QuizItemRequestModel and specifies the text type discriminator.
/// </summary>
public sealed record QuizItemRequestTextModel : QuizItemRequestModel
{
    /// <summary>
    /// Returns "text" as the type discriminator for this quiz item request type.
    /// </summary>
    public override string Type => "text";

    /// <summary>
    /// The placeholder text to display in the text input field as a hint to the user.
    /// </summary>
    public required string Placeholder { get; init; }
}
