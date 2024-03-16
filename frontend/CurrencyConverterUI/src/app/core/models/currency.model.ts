export interface Currency {
  currency: string;
  rate: number;
}

export interface ConvertedState {
  convertedAmount: number;
  eurAmount: number;
  customCurrencyAmount: number;
}

export enum AmountType {
  EUR,
  Custom
}
