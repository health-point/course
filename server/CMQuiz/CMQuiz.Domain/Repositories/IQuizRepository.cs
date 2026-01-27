using CMQuiz.Domain.Entities;

namespace CMQuiz.Domain.Repositories;

/// <summary>
/// Repository interface for managing quiz entities. Provides CRUD operations and pagination support.
/// </summary>
public interface IQuizRepository
{
    /// <summary>
    /// Retrieves a quiz entity by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the quiz.</param>
    /// <returns>The quiz entity if found, otherwise null.</returns>
    Task<Quiz?> GetByIdAsync(int id);

    /// <summary>
    /// Creates a new quiz entity in the repository and assigns a unique identifier.
    /// </summary>
    /// <param name="quiz">The quiz entity to create. The identifier will be assigned by the repository.</param>
    /// <returns>The created quiz entity with assigned identifier.</returns>
    Task<Quiz> CreateAsync(Quiz quiz);

    /// <summary>
    /// Retrieves all quiz entities from the repository.
    /// </summary>
    /// <returns>List of all quiz entities.</returns>
    Task<List<Quiz>> GetAllAsync();

    /// <summary>
    /// Retrieves a paginated list of quiz entities.
    /// </summary>
    /// <param name="pageNumber">The page number to retrieve (1-based indexing).</param>
    /// <param name="pageSize">The number of items to retrieve per page.</param>
    /// <returns>Tuple containing the list of quiz entities for the requested page and total count of all quizzes.</returns>
    Task<(List<Quiz> Items, int TotalCount)> GetPagedAsync(int pageNumber, int pageSize);
}
