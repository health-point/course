using CMQuiz.Domain.Repositories;
using CMQuiz.Infrastructure.Repositories;
using CMQuiz.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace CMQuiz.Infrastructure;

/// <summary>
/// Extension methods for configuring infrastructure services in the dependency injection container.
/// </summary>
public static class DependencyInjection
{
    /// <summary>
    /// Registers all infrastructure services including repositories and session service as singletons.
    /// </summary>
    /// <param name="services">The service collection to add services to.</param>
    /// <returns>The service collection for method chaining.</returns>
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddSingleton<IQuizRepository, InMemoryQuizRepository>();
        services.AddSingleton<IQuizResponseRepository, InMemoryQuizResponseRepository>();
        services.AddSingleton<IUserRepository, InMemoryUserRepository>();
        services.AddSingleton<ISessionService, SessionService>();
        
        return services;
    }
}
