using System.Text.Json.Serialization;

namespace Data.Model;

public class CurrencyRate
{
    [JsonPropertyName("currency")]
    public string? Currency { get; set; }
    [JsonPropertyName("rate")]
    public decimal? Rate { get; set; }
}