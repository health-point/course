using CMQuiz.Application.Interfaces;
using CMQuiz.Web.API.Attributes;
using CMQuiz.Web.API.Mappers;
using CMQuiz.Web.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CMQuiz.Web.API.Controllers;

/// <summary>
/// Controller for managing quiz responses. Provides endpoints for submitting responses and retrieving paginated response lists.
/// </summary>
[ApiController]
[Route("api/quizzes/{quizId}/responses")]
[Authorize]
public class QuizResponseController(
    ISubmitQuizResponseUseCase submitQuizResponseUseCase,
    IGetQuizResponsesUseCase getQuizResponsesUseCase)
    : ControllerBase
{
    /// <summary>
    /// Submits a response to a specific quiz with answers provided by the authenticated user.
    /// </summary>
    /// <param name="quizId">The unique identifier of the quiz to respond to.</param>
    /// <param name="model">Response data containing answers mapped by quiz item identifiers.</param>
    /// <returns>Created response identifier if submission succeeds, otherwise returns unauthorized status.</returns>
    [HttpPost]
    public async Task<IActionResult> SubmitResponse(int quizId, [FromBody] QuizResponseRequestModel model)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
        {
            return Unauthorized();
        }

        var request = QuizMapper.ToQuizResponseRequest(model, quizId);
        var response = await submitQuizResponseUseCase.ExecuteAsync(request, userId);
        
        return Ok(new { id = response.Id });
    }

    /// <summary>
    /// Retrieves a paginated list of all responses for a specific quiz.
    /// </summary>
    /// <param name="quizId">The unique identifier of the quiz to retrieve responses for.</param>
    /// <param name="pageNumber">The page number to retrieve (1-based). Defaults to 1.</param>
    /// <param name="pageSize">The number of items per page. Defaults to 10, maximum is 100.</param>
    /// <returns>Paginated result containing list of quiz response models and pagination metadata.</returns>
    [HttpGet]
    public async Task<ActionResult<PagedResult<QuizResponseModel>>> GetResponses(int quizId, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        if (pageNumber < 1) pageNumber = 1;
        if (pageSize < 1) pageSize = 10;
        if (pageSize > 100) pageSize = 100;

        var (items, totalCount) = await getQuizResponsesUseCase.ExecuteAsync(quizId, pageNumber, pageSize);
        var models = items.Select(QuizMapper.ToQuizResponseModel).ToList();

        var result = new PagedResult<QuizResponseModel>
        {
            Items = models,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };

        return Ok(result);
    }
}

