using CMQuiz.Application.Interfaces;
using CMQuiz.Domain.Repositories;

namespace CMQuiz.Application.UseCases;

/// <summary>
/// Use case implementation for retrieving paginated list of quizzes.
/// </summary>
public class GetQuizzesUseCase(IQuizRepository quizRepository) : IGetQuizzesUseCase
{
    /// <summary>
    /// Retrieves a paginated list of quizzes from the repository.
    /// </summary>
    public async Task<(List<Domain.Entities.Quiz> Items, int TotalCount)> ExecuteAsync(int pageNumber, int pageSize)
    {
        return await quizRepository.GetPagedAsync(pageNumber, pageSize);
    }
}
