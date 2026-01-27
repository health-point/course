using CMQuiz.Domain.Entities;
using CMQuiz.Domain.Repositories;

namespace CMQuiz.Infrastructure.Repositories;

/// <summary>
/// In-memory implementation of quiz response repository using dictionary storage.
/// Provides operations for creating and querying quiz responses with pagination support.
/// Data is stored in memory and will be lost on application restart.
/// </summary>
public class InMemoryQuizResponseRepository : IQuizResponseRepository
{
    private readonly Dictionary<int, List<QuizResponse>> _responses = new();
    private int _nextId = 1;

    /// <summary>
    /// Creates a new quiz response entity, assigns a unique identifier, and stores it grouped by quiz identifier.
    /// </summary>
    public Task<QuizResponse> CreateAsync(QuizResponse response)
    {
        var id = _nextId++;
        var responseWithId = response with { Id = id };
        
        if (!_responses.ContainsKey(responseWithId.QuizId))
        {
            _responses[responseWithId.QuizId] = new List<QuizResponse>();
        }
        
        _responses[responseWithId.QuizId].Add(responseWithId);
        return Task.FromResult(responseWithId);
    }

    /// <summary>
    /// Retrieves all response entities for a specific quiz from the in-memory dictionary.
    /// </summary>
    public Task<List<QuizResponse>> GetByQuizIdAsync(int quizId)
    {
        _responses.TryGetValue(quizId, out var responses);
        return Task.FromResult(responses ?? new List<QuizResponse>());
    }

    /// <summary>
    /// Retrieves all response entities submitted by a specific user by searching across all quiz responses.
    /// </summary>
    public Task<List<QuizResponse>> GetByUserIdAsync(int userId)
    {
        var allResponses = _responses.Values
            .SelectMany(r => r)
            .Where(r => r.UserId == userId)
            .ToList();
        
        return Task.FromResult(allResponses);
    }

    /// <summary>
    /// Retrieves a paginated list of response entities for a specific quiz with total count for pagination metadata.
    /// </summary>
    public Task<(List<QuizResponse> Items, int TotalCount)> GetPagedByQuizIdAsync(int quizId, int pageNumber, int pageSize)
    {
        _responses.TryGetValue(quizId, out var responses);
        var allResponses = responses ?? new List<QuizResponse>();
        var totalCount = allResponses.Count;
        var items = allResponses
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        
        return Task.FromResult((items, totalCount));
    }

    /// <summary>
    /// Retrieves a paginated list of response entities submitted by a specific user with total count for pagination metadata.
    /// </summary>
    public Task<(List<QuizResponse> Items, int TotalCount)> GetPagedByUserIdAsync(int userId, int pageNumber, int pageSize)
    {
        var allResponses = _responses.Values
            .SelectMany(r => r)
            .Where(r => r.UserId == userId)
            .ToList();
        
        var totalCount = allResponses.Count;
        var items = allResponses
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        
        return Task.FromResult((items, totalCount));
    }
}
