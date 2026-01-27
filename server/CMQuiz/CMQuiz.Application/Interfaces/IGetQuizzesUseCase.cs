using CMQuiz.Domain.Entities;

namespace CMQuiz.Application.Interfaces;

/// <summary>
/// Use case interface for retrieving paginated list of quizzes.
/// </summary>
public interface IGetQuizzesUseCase
{
    /// <summary>
    /// Retrieves a paginated list of all quizzes in the system.
    /// </summary>
    /// <param name="pageNumber">The page number to retrieve (1-based indexing).</param>
    /// <param name="pageSize">The number of items to retrieve per page.</param>
    /// <returns>Tuple containing the list of quiz entities and total count of all quizzes.</returns>
    Task<(List<Quiz> Items, int TotalCount)> ExecuteAsync(int pageNumber, int pageSize);
}
