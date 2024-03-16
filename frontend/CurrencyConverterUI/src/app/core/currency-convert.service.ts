import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AmountType, ConvertedState, Currency} from "./models/currency.model";
import {CurrencyApiService} from "./currency-api.service";

@Injectable({
  providedIn: 'root'
})
export class CurrencyConvertService {

  public $convertedState: BehaviorSubject<ConvertedState> = new BehaviorSubject<ConvertedState>({
    convertedAmount: 0,
    eurAmount: 0,
    customCurrencyAmount: 0
  });

  public $currencies: BehaviorSubject<Currency[]> = new BehaviorSubject<Currency[]>([{ currency: 'N/A', rate: 0}]);

  constructor(private currencyService: CurrencyApiService) {
    this.currencyService.getLatestCurrencyRates().subscribe(currencies => {
      this.$currencies.next([...this.$currencies.value, ...currencies])
    });
  }

  public convert(currency: string, amount: number, amountType: AmountType) {
    const rate = this.getCurrencyRate(currency);
    const convertedAmount = this.getConvertedAmount(amount, rate, amountType);
    this.$convertedState.next({
      convertedAmount: amountType === AmountType.Custom ? amount : convertedAmount,
      eurAmount: amountType === AmountType.EUR ? amount : convertedAmount,
      customCurrencyAmount: amountType === AmountType.Custom ? amount : convertedAmount
    })
  }

  getCurrencyRate(currency: string): number {
    const rate = this.$currencies.value
      .filter(c => c.currency === currency)
      .map(c => c.rate)
      .reduce((prev, curr) => curr);
    return rate
  }

  public getCurrencySymbol(currency: string): string {
    const symbol = new Intl.NumberFormat(
      'en-US',
      { style: 'currency', currency})
      .formatToParts(1)
      .find(x => x.type === 'currency');
    if (symbol === undefined) return 'N/A';
    return symbol.value
  }

  private getConvertedAmount(amount: number, rate: number, type: AmountType): number {
    const converted = this.getConvertedAmountByTypeAndRate(amount, rate, type)
    if (Number.isNaN(converted)) {
      return 0;
    }
    return converted;
  }

  private getConvertedAmountByTypeAndRate(amount: number, rate: number, type: AmountType): number {
    return type === AmountType.EUR
      ? amount * rate
      : amount / rate
  }
}
