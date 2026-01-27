using CMQuiz.Application.Interfaces;
using CMQuiz.Web.API.Attributes;
using CMQuiz.Web.API.Mappers;
using CMQuiz.Web.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace CMQuiz.Web.API.Controllers;

/// <summary>
/// Controller for managing quizzes. Provides endpoints for creating, retrieving, and listing quizzes.
/// </summary>
[ApiController]
[Route("api/quizes")]
[Authorize]
public class QuizController(
    ICreateQuizUseCase createQuizUseCase,
    IGetQuizUseCase getQuizUseCase,
    IGetQuizzesUseCase getQuizzesUseCase)
    : ControllerBase
{
    /// <summary>
    /// Creates a new quiz with the provided quiz data including name, description, and items.
    /// </summary>
    /// <param name="model">Quiz creation data containing name, description, and list of quiz items.</param>
    /// <returns>Created quiz model with assigned identifier.</returns>
    [HttpPost]
    public async Task<ActionResult<QuizModel>> CreateQuiz([FromBody] CreateQuizRequestModel model)
    {
        var request = QuizMapper.ToCreateQuizRequest(model);
        var quiz = await createQuizUseCase.ExecuteAsync(request);
        var dto = QuizMapper.ToQuizModel(quiz);
        return Ok(dto);
    }

    /// <summary>
    /// Retrieves a specific quiz by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the quiz to retrieve.</param>
    /// <returns>Quiz model if found, otherwise returns not found status.</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<QuizModel>> GetQuiz(int id)
    {
        var quiz = await getQuizUseCase.ExecuteAsync(id);
        if (quiz == null)
        {
            return NotFound();
        }

        var dto = QuizMapper.ToQuizModel(quiz);
        return Ok(dto);
    }

    /// <summary>
    /// Retrieves a paginated list of all quizzes in the system.
    /// </summary>
    /// <param name="pageNumber">The page number to retrieve (1-based). Defaults to 1.</param>
    /// <param name="pageSize">The number of items per page. Defaults to 10, maximum is 100.</param>
    /// <returns>Paginated result containing list of quiz models and pagination metadata.</returns>
    [HttpGet]
    public async Task<ActionResult<PagedResult<QuizModel>>> GetQuizzes([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        if (pageNumber < 1) pageNumber = 1;
        if (pageSize < 1) pageSize = 10;
        if (pageSize > 100) pageSize = 100;

        var (items, totalCount) = await getQuizzesUseCase.ExecuteAsync(pageNumber, pageSize);
        var models = items.Select(QuizMapper.ToQuizModel).ToList();

        var result = new PagedResult<QuizModel>
        {
            Items = models,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };

        return Ok(result);
    }
}

