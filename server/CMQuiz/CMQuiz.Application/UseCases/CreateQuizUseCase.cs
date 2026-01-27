using CMQuiz.Application.Interfaces;
using CMQuiz.Application.Requests;
using CMQuiz.Domain.Entities;
using CMQuiz.Domain.Repositories;

namespace CMQuiz.Application.UseCases;

/// <summary>
/// Use case implementation for creating a new quiz with polymorphic quiz items.
/// </summary>
public class CreateQuizUseCase(IQuizRepository quizRepository) : ICreateQuizUseCase
{
    /// <summary>
    /// Creates a new quiz entity from the request, mapping polymorphic quiz items to their concrete types.
    /// </summary>
    public async Task<Quiz> ExecuteAsync(CreateQuizRequest request)
    {
        var items = new List<QuizItem>();
        int itemId = 1;
        
        foreach (var itemRequest in request.Items)
        {
            QuizItem item = itemRequest switch
            {
                QuizItemRequestSelect select => new QuizItemSelect
                {
                    Id = itemId++,
                    Title = select.Title,
                    Description = select.Description,
                    QuizId = 0,
                    Type = QuizItemType.Select,
                    Options = select.Options.ToList()
                },
                QuizItemRequestText text => new QuizItemText
                {
                    Id = itemId++,
                    Title = text.Title,
                    Description = text.Description,
                    QuizId = 0,
                    Type = QuizItemType.Text,
                    Placeholder = text.Placeholder
                },
                QuizItemRequestRange range => new QuizItemRange
                {
                    Id = itemId++,
                    Title = range.Title,
                    Description = range.Description,
                    QuizId = 0,
                    Type = QuizItemType.Range,
                    Min = range.Min,
                    Max = range.Max
                },
                _ => throw new ArgumentException("Unknown quiz item type")
            };
            
            items.Add(item);
        }

        var quiz = new Quiz
        {
            Id = 0,
            Name = request.Name,
            Description = request.Description,
            Items = items
        };

        var createdQuiz = await quizRepository.CreateAsync(quiz);
        
        var updatedItems = createdQuiz.Items.Select(item => item switch
        {
            QuizItemSelect select => (QuizItem)(select with { QuizId = createdQuiz.Id }),
            QuizItemText text => text with { QuizId = createdQuiz.Id },
            QuizItemRange range => range with { QuizId = createdQuiz.Id },
            _ => item
        }).ToList();

        return createdQuiz with { Items = updatedItems };
    }
}
