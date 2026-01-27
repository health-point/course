using CMQuiz.Application.Interfaces;
using CMQuiz.Domain.Repositories;

namespace CMQuiz.Application.UseCases;

/// <summary>
/// Use case implementation for retrieving a single quiz by identifier.
/// </summary>
public class GetQuizUseCase(IQuizRepository quizRepository) : IGetQuizUseCase
{
    /// <summary>
    /// Retrieves a quiz entity from the repository by its identifier.
    /// </summary>
    public async Task<Domain.Entities.Quiz?> ExecuteAsync(int quizId)
    {
        return await quizRepository.GetByIdAsync(quizId);
    }
}
