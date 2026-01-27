using CMQuiz.Domain.Entities;
using CMQuiz.Domain.Repositories;

namespace CMQuiz.Infrastructure.Repositories;

/// <summary>
/// In-memory implementation of quiz repository using dictionary storage.
/// Provides CRUD operations and pagination support for quiz entities.
/// Data is stored in memory and will be lost on application restart.
/// </summary>
public class InMemoryQuizRepository : IQuizRepository
{
    private readonly Dictionary<int, Quiz> _quizzes = new();
    private int _nextId = 1;

    /// <summary>
    /// Retrieves a quiz entity by its unique identifier from the in-memory dictionary.
    /// </summary>
    public Task<Quiz?> GetByIdAsync(int id)
    {
        _quizzes.TryGetValue(id, out var quiz);
        return Task.FromResult(quiz);
    }

    /// <summary>
    /// Creates a new quiz entity, assigns a unique identifier, and stores it in the dictionary.
    /// </summary>
    public Task<Quiz> CreateAsync(Quiz quiz)
    {
        var id = _nextId++;
        var quizWithId = quiz with { Id = id };
        _quizzes[quizWithId.Id] = quizWithId;
        return Task.FromResult(quizWithId);
    }

    /// <summary>
    /// Retrieves all quiz entities from the in-memory dictionary.
    /// </summary>
    public Task<List<Quiz>> GetAllAsync()
    {
        return Task.FromResult(_quizzes.Values.ToList());
    }

    /// <summary>
    /// Retrieves a paginated list of quiz entities with total count for pagination metadata.
    /// </summary>
    public Task<(List<Quiz> Items, int TotalCount)> GetPagedAsync(int pageNumber, int pageSize)
    {
        var allQuizzes = _quizzes.Values.ToList();
        var totalCount = allQuizzes.Count;
        var items = allQuizzes
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        
        return Task.FromResult((items, totalCount));
    }
}
