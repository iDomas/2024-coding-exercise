using Serilog;

namespace CurrencyConverterApi;

public class Program
{
    public static void Main(string[] args)
    {
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webHostBuilder =>
            {
                webHostBuilder.ConfigureAppConfiguration((context, builder) =>
                {
                    builder.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
                    builder.AddJsonFile($"appsettings.{context.HostingEnvironment.EnvironmentName}.json",
                        optional: true, reloadOnChange: true);
                });
                webHostBuilder.UseStartup<Startup>();
            })
            .UseSerilog((context, configuration) =>
                configuration
                    .ReadFrom.Configuration(context.Configuration)
                    .Enrich.FromLogContext(),
                writeToProviders: true)
            .Build()
            .Run();
    }
}

