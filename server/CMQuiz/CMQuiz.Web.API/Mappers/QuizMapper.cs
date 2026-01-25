using CMQuiz.Application.Requests;
using CMQuiz.Domain.Entities;
using CMQuiz.Web.API.Models;

namespace CMQuiz.Web.API.Mappers;

/// <summary>
/// Static mapper class for converting between API models and application request models.
/// Provides mapping methods for quiz-related data structures.
/// </summary>
public static class QuizMapper
{
    /// <summary>
    /// Maps a quiz creation request model from API layer to application layer.
    /// </summary>
    /// <param name="model">The API model containing quiz creation data.</param>
    /// <returns>Application request model for creating a quiz.</returns>
    public static CreateQuizRequest ToCreateQuizRequest(CreateQuizRequestModel model)
    {
        return new CreateQuizRequest
        {
            Name = model.Name,
            Description = model.Description,
            Items = model.Items.Select(ToQuizItemRequest).ToList().AsReadOnly()
        };
    }

    /// <summary>
    /// Maps a quiz item request model to application request model based on item type.
    /// </summary>
    /// <param name="model">The polymorphic quiz item request model.</param>
    /// <returns>Application request model for the quiz item.</returns>
    /// <exception cref="ArgumentException">Thrown when the quiz item type is unknown.</exception>
    private static QuizItemRequest ToQuizItemRequest(QuizItemRequestModel model)
    {
        return model switch
        {
            QuizItemRequestSelectModel m => new QuizItemRequestSelect
            {
                Title = m.Title,
                Description = m.Description,
                Options = m.Options.ToList().AsReadOnly()
            },
            QuizItemRequestTextModel m => new QuizItemRequestText
            {
                Title = m.Title,
                Description = m.Description,
                Placeholder = m.Placeholder
            },
            QuizItemRequestRangeModel m => new QuizItemRequestRange
            {
                Title = m.Title,
                Description = m.Description,
                Min = m.Min,
                Max = m.Max
            },
            _ => throw new ArgumentException("Unknown quiz item type")
        };
    }

    /// <summary>
    /// Maps a domain quiz entity to API response model.
    /// </summary>
    /// <param name="quiz">The domain quiz entity to map.</param>
    /// <returns>API model representing the quiz with all items.</returns>
    public static QuizModel ToQuizModel(Quiz quiz)
    {
        return new QuizModel
        {
            Id = quiz.Id,
            Name = quiz.Name,
            Description = quiz.Description,
            Items = quiz.Items.Select(item => ToQuizItemModel(item, quiz.Id)).ToList().AsReadOnly()
        };
    }

    /// <summary>
    /// Maps a domain quiz item entity to API response model based on item type.
    /// </summary>
    /// <param name="item">The polymorphic quiz item entity.</param>
    /// <param name="quizId">The identifier of the parent quiz.</param>
    /// <returns>API model representing the quiz item.</returns>
    /// <exception cref="ArgumentException">Thrown when the quiz item type is unknown.</exception>
    private static QuizItemModel ToQuizItemModel(QuizItem item, int quizId)
    {
        return item switch
        {
            QuizItemSelect select => new QuizItemSelectModel
            {
                Id = item.Id,
                QuizId = quizId,
                Options = select.Options.ToList().AsReadOnly()
            },
            QuizItemText text => new QuizItemTextModel
            {
                Id = item.Id,
                QuizId = quizId,
                Placeholder = text.Placeholder
            },
            QuizItemRange range => new QuizItemRangeModel
            {
                Id = item.Id,
                QuizId = quizId,
                Min = range.Min,
                Max = range.Max
            },
            _ => throw new ArgumentException("Unknown quiz item type")
        };
    }

    /// <summary>
    /// Maps a quiz response request model from API layer to application layer.
    /// </summary>
    /// <param name="model">The API model containing response data.</param>
    /// <param name="quizId">The identifier of the quiz being responded to.</param>
    /// <returns>Application request model for submitting a quiz response.</returns>
    public static QuizResponseRequest ToQuizResponseRequest(QuizResponseRequestModel model, int quizId)
    {
        return new QuizResponseRequest
        {
            QuizId = quizId,
            Answers = new Dictionary<int, object>(model.Answers)
        };
    }

    /// <summary>
    /// Maps a login request model from API layer to application layer.
    /// </summary>
    /// <param name="model">The API model containing login credentials.</param>
    /// <returns>Application request model for user authentication.</returns>
    public static LoginRequest ToLoginRequest(LoginRequestModel model)
    {
        return new LoginRequest
        {
            Username = model.Username,
            Password = model.Password
        };
    }

    /// <summary>
    /// Maps a registration request model from API layer to application layer.
    /// </summary>
    /// <param name="model">The API model containing registration data.</param>
    /// <returns>Application request model for user registration.</returns>
    public static RegisterRequest ToRegisterRequest(RegisterRequestModel model)
    {
        return new RegisterRequest
        {
            Username = model.Username,
            Password = model.Password
        };
    }

    /// <summary>
    /// Maps a domain quiz response entity to API response model.
    /// </summary>
    /// <param name="response">The domain quiz response entity to map.</param>
    /// <returns>API model representing the quiz response.</returns>
    public static QuizResponseModel ToQuizResponseModel(Domain.Entities.QuizResponse response)
    {
        return new QuizResponseModel
        {
            Id = response.Id,
            QuizId = response.QuizId,
            UserId = response.UserId,
            Answers = new Dictionary<int, object>(response.Answers)
        };
    }
}

