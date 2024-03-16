import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Currency} from "./models/currency.model";
import {ApiConstant} from "./constants/api.constant";

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {

  constructor(private httpClient: HttpClient) { }

  public getLatestCurrencyRates(): Observable<Currency[]> {
    return this.httpClient.get<Currency[]>(ApiConstant.LatestCurrencyApiUrl)
  }
}
