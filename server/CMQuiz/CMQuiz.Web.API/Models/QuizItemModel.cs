using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CMQuiz.Web.API.Models;

/// <summary>
/// Base abstract record for polymorphic quiz item models. Supports JSON polymorphic deserialization based on type discriminator.
/// </summary>
[JsonDerivedType(typeof(QuizItemSelectModel), typeDiscriminator: "select")]
[JsonDerivedType(typeof(QuizItemTextModel), typeDiscriminator: "text")]
[JsonDerivedType(typeof(QuizItemRangeModel), typeDiscriminator: "range")]
[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
public abstract record QuizItemModel
{
    /// <summary>
    /// The type discriminator for polymorphic deserialization. Must be one of: "select", "text", or "range".
    /// </summary>
    [Required]
    [JsonPropertyName("type")]
    public abstract string Type { get; }
    
    /// <summary>
    /// The unique identifier of the quiz item within the quiz.
    /// </summary>
    public required int Id { get; init; }

    /// <summary>
    /// The unique identifier of the parent quiz that this item belongs to.
    /// </summary>
    public required int QuizId { get; init; }
}
