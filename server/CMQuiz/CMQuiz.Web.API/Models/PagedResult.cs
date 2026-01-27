namespace CMQuiz.Web.API.Models;

/// <summary>
/// Represents a paginated result set with metadata about pagination state.
/// </summary>
/// <typeparam name="T">The type of items contained in the result set.</typeparam>
public sealed record PagedResult<T>
{
    /// <summary>
    /// The list of items for the current page.
    /// </summary>
    public required IReadOnlyList<T> Items { get; init; }

    /// <summary>
    /// The total number of items across all pages.
    /// </summary>
    public required int TotalCount { get; init; }

    /// <summary>
    /// The current page number (1-based indexing).
    /// </summary>
    public required int PageNumber { get; init; }

    /// <summary>
    /// The number of items per page.
    /// </summary>
    public required int PageSize { get; init; }

    /// <summary>
    /// Calculated total number of pages based on total count and page size.
    /// </summary>
    public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);

    /// <summary>
    /// Indicates whether there is a previous page available.
    /// </summary>
    public bool HasPreviousPage => PageNumber > 1;

    /// <summary>
    /// Indicates whether there is a next page available.
    /// </summary>
    public bool HasNextPage => PageNumber < TotalPages;
}
