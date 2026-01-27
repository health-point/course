using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CMQuiz.Web.API.Models;

/// <summary>
/// Base abstract record for polymorphic quiz item request models. Supports JSON polymorphic deserialization based on type discriminator.
/// Used when creating quizzes to specify different types of quiz items.
/// </summary>
[JsonDerivedType(typeof(QuizItemRequestSelectModel), typeDiscriminator: "select")]
[JsonDerivedType(typeof(QuizItemRequestTextModel), typeDiscriminator: "text")]
[JsonDerivedType(typeof(QuizItemRequestRangeModel), typeDiscriminator: "range")]
[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
public abstract record QuizItemRequestModel
{
    public required string Title { get; init; }
    public required string Description { get; init; }
    /// <summary>
    /// The type discriminator for polymorphic deserialization. Must be one of: "select", "text", or "range".
    /// This field is required and determines which concrete type will be deserialized.
    /// </summary>
    [Required]
    [JsonPropertyName("type")]
    public abstract string Type { get; }
}
