using Data.Model;

namespace ServiceLayer.Abstraction;

public interface IEcbCurrencyRateService
{
    IEnumerable<CurrencyRate> GetLatestCurrencyRates();
}