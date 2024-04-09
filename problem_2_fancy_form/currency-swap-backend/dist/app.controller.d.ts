import { AppService, IAssetRequest, IAssetResponse, ICurrency } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getAllCurrencies(): Promise<ICurrency[]>;
    getCurrencies(asset: IAssetRequest): Promise<IAssetResponse>;
}
