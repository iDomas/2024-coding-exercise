using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Abstraction;

namespace CurrencyConverterApi.Controllers;

[Route("api/v1/")]
[ApiController]
public class CurrencyRateController(
    IEcbCurrencyRateService currencyRateService
    ) : ControllerBase
{

    [HttpGet("currency-rates/latest")]
    public async Task<IActionResult> GetLatestCurrencyRates()
    {
        return Ok(currencyRateService.GetLatestCurrencyRates());
    }
}