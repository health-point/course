FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["CMQuiz.Domain/CMQuiz.Domain.csproj", "CMQuiz.Domain/"]
COPY ["CMQuiz.Application/CMQuiz.Application.csproj", "CMQuiz.Application/"]
COPY ["CMQuiz.Infrastructure/CMQuiz.Infrastructure.csproj", "CMQuiz.Infrastructure/"]
COPY ["CMQuiz.Web.API/CMQuiz.Web.API.csproj", "CMQuiz.Web.API/"]
RUN dotnet restore "CMQuiz.Web.API/CMQuiz.Web.API.csproj"
COPY . .
WORKDIR "/src/CMQuiz.Web.API"
RUN dotnet build "./CMQuiz.Web.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./CMQuiz.Web.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CMQuiz.Web.API.dll"]
