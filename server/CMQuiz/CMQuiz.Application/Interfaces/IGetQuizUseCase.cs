namespace CMQuiz.Application.Interfaces;

/// <summary>
/// Use case interface for retrieving a single quiz by its identifier.
/// </summary>
public interface IGetQuizUseCase
{
    /// <summary>
    /// Retrieves a quiz entity by its unique identifier.
    /// </summary>
    /// <param name="quizId">The unique identifier of the quiz to retrieve.</param>
    /// <returns>The quiz entity if found, otherwise null.</returns>
    Task<Domain.Entities.Quiz?> ExecuteAsync(int quizId);
}
