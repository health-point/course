using CMQuiz.Application.Requests;

namespace CMQuiz.Application.Interfaces;

/// <summary>
/// Use case interface for creating a new quiz with associated quiz items.
/// </summary>
public interface ICreateQuizUseCase
{
    /// <summary>
    /// Creates a new quiz based on the provided request data.
    /// </summary>
    /// <param name="request">The quiz creation request containing name, description, and list of quiz items.</param>
    /// <returns>The created quiz entity with assigned identifier and properly linked quiz items.</returns>
    Task<Domain.Entities.Quiz> ExecuteAsync(CreateQuizRequest request);
}
