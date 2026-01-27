using CMQuiz.Domain.Entities;

namespace CMQuiz.Application.Interfaces;

/// <summary>
/// Use case interface for retrieving paginated lists of quiz responses.
/// </summary>
public interface IGetQuizResponsesUseCase
{
    /// <summary>
    /// Retrieves a paginated list of responses for a specific quiz.
    /// </summary>
    /// <param name="quizId">The unique identifier of the quiz to retrieve responses for.</param>
    /// <param name="pageNumber">The page number to retrieve (1-based indexing).</param>
    /// <param name="pageSize">The number of items to retrieve per page.</param>
    /// <returns>Tuple containing the list of quiz response entities and total count of responses for the quiz.</returns>
    Task<(List<QuizResponse> Items, int TotalCount)> ExecuteAsync(int quizId, int pageNumber, int pageSize);

    /// <summary>
    /// Retrieves a paginated list of responses submitted by a specific user.
    /// </summary>
    /// <param name="userId">The unique identifier of the user to retrieve responses for.</param>
    /// <param name="pageNumber">The page number to retrieve (1-based indexing).</param>
    /// <param name="pageSize">The number of items to retrieve per page.</param>
    /// <returns>Tuple containing the list of quiz response entities and total count of responses by the user.</returns>
    Task<(List<QuizResponse> Items, int TotalCount)> ExecuteByUserIdAsync(int userId, int pageNumber, int pageSize);
}
