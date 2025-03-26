namespace Application.Common.Helpers;

public static class StringExtensions
{
    public static string Pluralize(this string singular)
    {
        if (string.IsNullOrWhiteSpace(singular))
            throw new ArgumentException("Input cannot be null or empty.", nameof(singular));

        if (singular.EndsWith("y", StringComparison.OrdinalIgnoreCase))
        {
            return singular.Substring(0, singular.Length - 1) + "ies";
        }
        else if (singular.EndsWith("s", StringComparison.OrdinalIgnoreCase) ||
                 singular.EndsWith("x", StringComparison.OrdinalIgnoreCase) ||
                 singular.EndsWith("z", StringComparison.OrdinalIgnoreCase) ||
                 singular.EndsWith("sh", StringComparison.OrdinalIgnoreCase) ||
                 singular.EndsWith("ch", StringComparison.OrdinalIgnoreCase))
        {
            return singular + "es";
        }
        else
        {
            return singular + "s";
        }
    }
}