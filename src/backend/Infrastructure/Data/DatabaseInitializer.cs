//using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
//using Microsoft.SqlServer.Dac;

namespace Infrastructure.Data;

public class DatabaseInitializer
{
    private readonly IConfiguration _configuration;

    public DatabaseInitializer(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void Initialize()
    {
        //var databaseConnectionString = _configuration.GetConnectionString("DefaultConnection");
        //var databaseName = _configuration.GetSection("DatabaseName").Value;

        //var masterConnectionString = new SqlConnectionStringBuilder(databaseConnectionString)
        //{
        //    InitialCatalog = "master"
        //}.ConnectionString;

        //using (var connection = new SqlConnection(masterConnectionString))
        //{
        //    connection.Open();

        //    var checkDatabaseCmd = new SqlCommand($"IF DB_ID(N'{databaseName}') IS NULL CREATE DATABASE [{databaseName}]", connection);

        //    var linesEffected =  checkDatabaseCmd.ExecuteNonQuery();

        //    var temp = AppDomain.CurrentDomain.BaseDirectory;
        //    var dacPackagePath = Path.Combine(temp, @"..\..\..\..\..\database\SqlDb\bin\Debug\SimulationPiDB.dacpac");

        //    var dacPackage = DacPackage.Load(dacPackagePath);
        //    var dacServices = new DacServices(databaseConnectionString);
            
        //    dacServices.Deploy(dacPackage, databaseName, upgradeExisting: true);
        //}
    }
}