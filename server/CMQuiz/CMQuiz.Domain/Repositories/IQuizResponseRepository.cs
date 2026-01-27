using CMQuiz.Domain.Entities;

namespace CMQuiz.Domain.Repositories;

/// <summary>
/// Repository interface for managing quiz response entities. Provides operations for creating and querying responses.
/// </summary>
public interface IQuizResponseRepository
{
    /// <summary>
    /// Creates a new quiz response entity in the repository and assigns a unique identifier.
    /// </summary>
    /// <param name="response">The quiz response entity to create. The identifier will be assigned by the repository.</param>
    /// <returns>The created quiz response entity with assigned identifier.</returns>
    Task<QuizResponse> CreateAsync(QuizResponse response);

    /// <summary>
    /// Retrieves all response entities for a specific quiz.
    /// </summary>
    /// <param name="quizId">The unique identifier of the quiz.</param>
    /// <returns>List of all quiz response entities for the specified quiz.</returns>
    Task<List<QuizResponse>> GetByQuizIdAsync(int quizId);

    /// <summary>
    /// Retrieves all response entities submitted by a specific user.
    /// </summary>
    /// <param name="userId">The unique identifier of the user.</param>
    /// <returns>List of all quiz response entities submitted by the specified user.</returns>
    Task<List<QuizResponse>> GetByUserIdAsync(int userId);

    /// <summary>
    /// Retrieves a paginated list of response entities for a specific quiz.
    /// </summary>
    /// <param name="quizId">The unique identifier of the quiz.</param>
    /// <param name="pageNumber">The page number to retrieve (1-based indexing).</param>
    /// <param name="pageSize">The number of items to retrieve per page.</param>
    /// <returns>Tuple containing the list of quiz response entities for the requested page and total count of responses for the quiz.</returns>
    Task<(List<QuizResponse> Items, int TotalCount)> GetPagedByQuizIdAsync(int quizId, int pageNumber, int pageSize);

    /// <summary>
    /// Retrieves a paginated list of response entities submitted by a specific user.
    /// </summary>
    /// <param name="userId">The unique identifier of the user.</param>
    /// <param name="pageNumber">The page number to retrieve (1-based indexing).</param>
    /// <param name="pageSize">The number of items to retrieve per page.</param>
    /// <returns>Tuple containing the list of quiz response entities for the requested page and total count of responses by the user.</returns>
    Task<(List<QuizResponse> Items, int TotalCount)> GetPagedByUserIdAsync(int userId, int pageNumber, int pageSize);
}
