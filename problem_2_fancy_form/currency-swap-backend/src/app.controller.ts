import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  AppService,
  IAssetRequest,
  IAssetResponse,
  ICurrency,
} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('currencies')
  public async getAllCurrencies(): Promise<ICurrency[]> {
    return await this.appService.getAllCurrencies();
  }
  @Post('asset/convert')
  public async getCurrencies(
    @Body() asset: IAssetRequest,
  ): Promise<IAssetResponse> {
    return await this.appService.convertAsset(asset);
  }
}
