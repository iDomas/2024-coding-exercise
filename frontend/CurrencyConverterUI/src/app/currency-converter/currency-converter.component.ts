import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../core/currency.service";
import {Currency} from "../core/models/currency.model";

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent implements OnInit {

  currencies: Currency[] = [];

  currencySelected!: string;

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.currencyService.getLatestCurrencyRates().subscribe(currencies => {
      this.currencies = currencies
    })
  }

  onCurrencySelected(target: any) {
    this.currencySelected = target.value;
  }

  getCurrencyRate(): string {
    return this.currencies
      .filter(c => c.currency === this.currencySelected)
      .map(c => c.rate)
      .reduce((prev, curr) => curr)
      .toString()
  }
}
