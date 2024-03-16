export class ApiConstant {
  private static ApiUrl = 'http://localhost:5056/';
  private static ApiV1 = 'api/v1'

  public static LatestCurrencyApiUrl = `${ApiConstant.ApiUrl}${ApiConstant.ApiV1}/currency-rates/latest`
}
