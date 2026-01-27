using CMQuiz.Application.Requests;

namespace CMQuiz.Application.Interfaces;

/// <summary>
/// Use case interface for submitting a response to a quiz.
/// </summary>
public interface ISubmitQuizResponseUseCase
{
    /// <summary>
    /// Submits a user's response to a quiz, validating that the quiz exists and all referenced items are valid.
    /// </summary>
    /// <param name="request">The quiz response request containing quiz identifier and answers mapped by item identifiers.</param>
    /// <param name="userId">The identifier of the user submitting the response.</param>
    /// <returns>The created quiz response entity with assigned identifier.</returns>
    /// <exception cref="ArgumentException">Thrown when the quiz does not exist or referenced quiz items are invalid.</exception>
    Task<Domain.Entities.QuizResponse> ExecuteAsync(QuizResponseRequest request, int userId);
}
