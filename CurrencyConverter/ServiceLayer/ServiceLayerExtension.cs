using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ServiceLayer.Abstraction;
using ServiceLayer.Services;

namespace ServiceLayer;

public static class ServiceLayerExtension
{
    public static void AddServiceLayer(this IServiceCollection services)
    {
        services.AddSingleton<IEcbCurrencyRateService, EcbCurrencyRateService>();
    }
}