import {Component} from '@angular/core';
import {AmountType, ConvertedState, Currency} from "../core/models/currency.model";
import {CurrencyConvertService} from "../core/currency-convert.service";
import {BehaviorSubject} from "rxjs";
import {AsyncPipe, DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [
    AsyncPipe,
    DecimalPipe
  ],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent {

  AmountType = AmountType;
  currencySelected!: string;
  $convertedAmount!: BehaviorSubject<ConvertedState>;
  $currencies: BehaviorSubject<Currency[]>

  constructor(private currencyConvertService: CurrencyConvertService) {
    this.$convertedAmount = this.currencyConvertService.$convertedState;
    this.$currencies = this.currencyConvertService.$currencies;
  }

  onCurrencySelected(target: any) {
    this.currencySelected = target.value;
    this.convert({ value: this.$convertedAmount.value.eurAmount }, AmountType.EUR)
  }

  getCurrencyRate(): number{
    return this.currencyConvertService.getCurrencyRate(this.currencySelected);
  }

  getCurrencyRateAsString(): string {
    const symbol = this.currencyConvertService.getCurrencySymbol(this.currencySelected);
    return `${this.getCurrencyRate()} ${symbol}`
  }

  getCurrencySymbol(currency: string): string {
    return this.currencyConvertService.getCurrencySymbol(currency);
  }

  convert(targetAmount: any, type: AmountType) {
    const amount = parseFloat(targetAmount.value)
    this.currencyConvertService.convert(this.currencySelected, amount, type)
  }
}


