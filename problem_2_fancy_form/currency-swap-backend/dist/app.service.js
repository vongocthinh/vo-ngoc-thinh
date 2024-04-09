"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    async getAllCurrencies() {
        const response = await axios_1.default.get('https://interview.switcheo.com/prices.json');
        return response.data;
    }
    async convertAsset(asset) {
        if (asset.amount <= 0)
            throw new common_1.BadRequestException('The amount must be greater than 0!');
        const allCurrencies = await this.getAllCurrencies();
        const sourceCurrency = allCurrencies.find((x) => x.currency === asset.currentCurrency);
        if (!sourceCurrency)
            throw new common_1.BadRequestException('Invalid source currency!');
        const targetCurrency = allCurrencies.find((x) => x.currency === asset.targetCurrency);
        if (!targetCurrency)
            throw new common_1.BadRequestException('Invalid target currency!');
        const response = {
            amount: (asset.amount * sourceCurrency.price) / targetCurrency.price,
            currency: targetCurrency.currency,
        };
        return response;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map