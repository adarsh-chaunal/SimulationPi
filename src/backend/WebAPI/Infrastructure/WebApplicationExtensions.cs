using System.Reflection;

namespace WebAPI.Infrastructure;

public static class WebApplicationExtensions
{
    /// <summary>
    /// Maps a specific endpoint group to a route group in the application.
    /// </summary>
    /// <param name="app">The WebApplication instance.</param>
    /// <param name="endpointGroup">The endpoint group to map.</param>
    /// <returns>A RouteGroupBuilder instance representing the mapped group.</returns>
    public static RouteGroupBuilder MapGroup(this WebApplication app, EndpointGroupBase endpointGroup)
    {
        var groupName = endpointGroup.GetType().Name;

        Console.WriteLine($"Mapping group: {groupName}");

        return app
            .MapGroup($"/api/{groupName.ToLower()}")
            //.WithGroupName(groupName)
            .WithTags(groupName);
    }

    /// <summary>
    /// Automatically discovers and maps all endpoint groups in the current assembly.
    /// </summary>
    /// <param name="app">The WebApplication instance.</param>
    /// <returns>The WebApplication instance with all endpoint groups mapped.</returns>
    public static WebApplication MapEndpoints(this WebApplication app)
    {
        // Define the base type for endpoint groups
        var endpointGroupBaseType = typeof(EndpointGroupBase);

        // Get the current assembly containing the WebApplicationExtensions class
        var currentAssembly = Assembly.GetExecutingAssembly();

        // Find all exported types in the assembly that inherit from EndpointGroupBase
        var endpointGroupTypes = currentAssembly.GetExportedTypes()
            .Where(type => type.IsSubclassOf(endpointGroupBaseType));

        // Instantiate and map each endpoint group
        foreach (var endpointGroupType in endpointGroupTypes)
        {
            if (Activator.CreateInstance(endpointGroupType) is EndpointGroupBase endpointGroupInstance)
            {
                endpointGroupInstance.Map(app);
            }
        }

        return app;
    }
}