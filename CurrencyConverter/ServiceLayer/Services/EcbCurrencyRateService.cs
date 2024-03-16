using System.Globalization;
using System.Xml;
using Data.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ServiceLayer.Abstraction;

namespace ServiceLayer.Services;

public class EcbCurrencyRateService(
    IConfiguration configuration,
    ILogger<EcbCurrencyRateService> logger
    ) : IEcbCurrencyRateService
{
    private const string LatestCurrencyRateUrlKey = "EcbCurrencyRatesUrl";
    
    public IEnumerable<CurrencyRate> GetLatestCurrencyRates()
    {
        logger.LogInformation("Getting latest currency rates");
        try
        {
            var rateUrl = configuration.GetSection(LatestCurrencyRateUrlKey).Value;
            if (rateUrl == null) return null;
            var httpClient = new HttpClient();
            var response = httpClient.GetAsync(rateUrl).Result;
            var strReader = new StringReader(response.Content.ReadAsStringAsync().Result);
            return GetRates(strReader);
        }
        catch (Exception e)
        {
            logger.LogError(e,"Error getting latest currency rates: {0}", e.Message);
            throw;
        }
    }

    private IEnumerable<CurrencyRate> GetRates(StringReader strReader)
    {
        var currencies = new List<CurrencyRate>();
        using var reader = new XmlTextReader(strReader);
        while (reader.Read())
        {
            if (reader.Name == "Cube" && reader.AttributeCount == 2)
            {
                decimal.TryParse(reader.GetAttribute("rate"), CultureInfo.InvariantCulture, out var rate);
                currencies.Add(new CurrencyRate
                {
                    Currency = reader.GetAttribute("currency"),
                    Rate = rate
                });
            }
        }
        return currencies.AsEnumerable();
    }
}