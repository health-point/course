namespace CMQuiz.Web.API.Models;

/// <summary>
/// Represents a select-type quiz item that presents multiple choice options to the user.
/// </summary>
public sealed record QuizItemSelectModel : QuizItemModel
{
    /// <summary>
    /// Returns "select" as the type discriminator for this quiz item type.
    /// </summary>
    public override string Type => "select";

    /// <summary>
    /// The list of available options that the user can choose from.
    /// </summary>
    public required IReadOnlyList<string> Options { get; init; }
}
