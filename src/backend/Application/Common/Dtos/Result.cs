namespace Application.Common.Dtos;

public class Result
{
    public bool IsSuccess { get; protected set; } = true;

    public IEnumerable<string> Errors { get; protected set; } = Enumerable.Empty<string>();

    public static Result Success() => new();

    public static Result Failure(IEnumerable<string> errors) => new()
    {
        IsSuccess = false,
        Errors = errors ?? Enumerable.Empty<string>()
    };
}

public class Result<T> : Result
{
    public T? Data { get; private set; }

    public static Result<T> Success(T data) => new()
    {
        Data = data
    };

    public new static Result<T> Failure(IEnumerable<string> errors) => new()
    {
        IsSuccess = false,
        Errors = errors ?? Enumerable.Empty<string>(),
        Data = default
    };
}