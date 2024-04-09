import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

export interface ICurrency {
  currency: string;
  date: Date;
  price: number;
}
export interface IAssetRequest {
  currentCurrency: string;
  amount: number;
  targetCurrency: string;
}
export interface IAssetResponse {
  amount: number;
  currency: string;
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  public async getAllCurrencies(): Promise<ICurrency[]> {
    const response = await axios.get(
      'https://interview.switcheo.com/prices.json',
    );
    return response.data;
  }

  public async convertAsset(asset: IAssetRequest): Promise<IAssetResponse> {
    if (asset.amount <= 0)
      throw new BadRequestException('The amount must be greater than 0!');

    const allCurrencies = await this.getAllCurrencies();

    const sourceCurrency = allCurrencies.find(
      (x) => x.currency === asset.currentCurrency,
    );
    if (!sourceCurrency)
      throw new BadRequestException('Invalid source currency!');

    const targetCurrency = allCurrencies.find(
      (x) => x.currency === asset.targetCurrency,
    );
    if (!targetCurrency)
      throw new BadRequestException('Invalid target currency!');

    const response: IAssetResponse = {
      amount: (asset.amount * sourceCurrency.price) / targetCurrency.price,
      currency: targetCurrency.currency,
    };
    return response;
  }
}
