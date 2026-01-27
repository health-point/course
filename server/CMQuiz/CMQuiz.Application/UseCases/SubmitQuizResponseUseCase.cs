using CMQuiz.Application.Interfaces;
using CMQuiz.Application.Requests;
using CMQuiz.Domain.Repositories;

namespace CMQuiz.Application.UseCases;

/// <summary>
/// Use case implementation for submitting quiz responses with validation.
/// </summary>
public class SubmitQuizResponseUseCase(IQuizResponseRepository responseRepository, IQuizRepository quizRepository) : ISubmitQuizResponseUseCase
{
    /// <summary>
    /// Validates the quiz and quiz items, then creates a response entity.
    /// </summary>
    public async Task<Domain.Entities.QuizResponse> ExecuteAsync(QuizResponseRequest request, int userId)
    {
        var quiz = await quizRepository.GetByIdAsync(request.QuizId);
        if (quiz == null)
        {
            throw new ArgumentException("Quiz not found");
        }

        var itemIds = quiz.Items.Select(i => i.Id).ToHashSet();
        foreach (var answerKey in request.Answers.Keys)
        {
            if (!itemIds.Contains(answerKey))
            {
                throw new ArgumentException($"Quiz item with id {answerKey} not found in quiz");
            }
        }

        var response = new Domain.Entities.QuizResponse
        {
            Id = 0,
            QuizId = request.QuizId,
            UserId = userId,
            Answers = new Dictionary<int, object>(request.Answers)
        };

        return await responseRepository.CreateAsync(response);
    }
}
