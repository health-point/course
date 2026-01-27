using CMQuiz.Application.Interfaces;
using CMQuiz.Domain.Repositories;

namespace CMQuiz.Application.UseCases;

/// <summary>
/// Use case implementation for retrieving paginated lists of quiz responses.
/// </summary>
public class GetQuizResponsesUseCase(IQuizResponseRepository responseRepository) : IGetQuizResponsesUseCase
{
    /// <summary>
    /// Retrieves a paginated list of responses for a specific quiz.
    /// </summary>
    public async Task<(List<Domain.Entities.QuizResponse> Items, int TotalCount)> ExecuteAsync(int quizId, int pageNumber, int pageSize)
    {
        return await responseRepository.GetPagedByQuizIdAsync(quizId, pageNumber, pageSize);
    }

    /// <summary>
    /// Retrieves a paginated list of responses submitted by a specific user.
    /// </summary>
    public async Task<(List<Domain.Entities.QuizResponse> Items, int TotalCount)> ExecuteByUserIdAsync(int userId, int pageNumber, int pageSize)
    {
        return await responseRepository.GetPagedByUserIdAsync(userId, pageNumber, pageSize);
    }
}
