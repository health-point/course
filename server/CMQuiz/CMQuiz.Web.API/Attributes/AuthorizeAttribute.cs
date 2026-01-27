using CMQuiz.Web.API.Filters;
using Microsoft.AspNetCore.Mvc;

namespace CMQuiz.Web.API.Attributes;

/// <summary>
/// Attribute that applies authorization filter to controllers or action methods.
/// Requires valid session cookie for access.
/// </summary>
public class AuthorizeAttribute : ServiceFilterAttribute
{
    /// <summary>
    /// Initializes a new instance of the AuthorizeAttribute.
    /// </summary>
    public AuthorizeAttribute() : base(typeof(AuthorizeFilter))
    {
    }
}

