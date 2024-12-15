namespace WebAPI.Infrastructure;

/// <summary>
/// Base class for defining a group of related API endpoints.
/// </summary>
/// <remarks>
/// This abstract class serves as a contract for all endpoint groups in the application.
/// Derived classes must implement the `Map` method to define and register their specific endpoints.
/// </remarks>
public abstract class EndpointGroupBase
{
    /// <summary>
    /// Defines and maps the endpoints for a specific group.
    /// </summary>
    /// <param name="app">The <see cref="WebApplication"/> instance used to register the endpoints.</param>
    /// <remarks>
    /// - The method must be implemented by derived classes to register routes and middleware.
    /// - This promotes modularity and separation of concerns by grouping related endpoints.
    /// </remarks>
    public abstract void Map(WebApplication app);
}