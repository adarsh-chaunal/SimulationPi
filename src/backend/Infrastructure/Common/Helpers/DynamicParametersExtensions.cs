using Dapper;

namespace Infrastructure.Common.Helpers;

public static class DynamicParametersExtensions
{
    public static void AddProperties(this DynamicParameters parameters, object model)
    {
        foreach (var property in model.GetType().GetProperties())
        {
            var value = property.GetValue(model);
            parameters.Add($"@{property.Name}", value);
        }
    }
}