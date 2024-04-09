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
export declare class AppService {
    getHello(): string;
    getAllCurrencies(): Promise<ICurrency[]>;
    convertAsset(asset: IAssetRequest): Promise<IAssetResponse>;
}
