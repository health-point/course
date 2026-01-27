namespace CMQuiz.Web.API.Models;

/// <summary>
/// Represents a text-type quiz item that requires a free-form text response from the user.
/// </summary>
public sealed record QuizItemTextModel : QuizItemModel
{
    /// <summary>
    /// Returns "text" as the type discriminator for this quiz item type.
    /// </summary>
    public override string Type => "text";

    /// <summary>
    /// The placeholder text to display in the text input field as a hint to the user.
    /// </summary>
    public required string Placeholder { get; init; }
}
