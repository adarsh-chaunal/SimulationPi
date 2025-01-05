using System.Data;
using Application.Common.Interfaces;
using Dapper;
using Domain.Entities;
using Infrastructure.Common.Constants;
using Infrastructure.Common.Helpers;
using Infrastructure.Data;

namespace Infrastructure.Services;

public class PlotService : IPlotService
{
    #region Fields

    private readonly IDbConnectionFactory _connectionFactory;

    #endregion

    #region Ctor

    public PlotService(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    #endregion

    #region Methods

    public async Task<Plot?> Get(string id)
    {
        using (var connection = _connectionFactory.CreateConnection())
        {
            var dynamicParameters = new DynamicParameters();

            dynamicParameters.Add(QueryParameters.OPERATION_TYPE, QueryParameters.SELECT);
            dynamicParameters.Add(QueryParameters.UNIQUE_ID, id);

            return await connection.QueryFirstOrDefaultAsync<Plot>(QueryHolder.MANAGE_PLOT,
                                        dynamicParameters,
                                        commandType: CommandType.StoredProcedure);
        }
    }

    public async Task<bool> Create(Plot plot)
    {
        using (var connection = _connectionFactory.CreateConnection())
        {
            var dynamicParameters = new DynamicParameters();

            dynamicParameters.Add(QueryParameters.OPERATION_TYPE, QueryParameters.INSERT);
            dynamicParameters.Add(QueryParameters.STATUS_MESSAGE, dbType: DbType.String, direction: ParameterDirection.Output);
            dynamicParameters.AddProperties(plot); // getting dynamic parameters from an extension method.

            await connection.ExecuteAsync(QueryHolder.MANAGE_PLOT,
                                        dynamicParameters,
                                        commandType: CommandType.StoredProcedure);

            return dynamicParameters.Get<string>(QueryParameters.STATUS_MESSAGE) == "INSERTED";
        }
    }

    #endregion
}