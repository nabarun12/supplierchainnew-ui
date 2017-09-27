import { RatingUi } from './rating-ui';

export class Supplier {
    readonly supplierId?: number;
    readonly supplierAddress: string;
    readonly supplierName: string;
    readonly walletAddress: string;
    ratings : RatingUi[];
    averagerating : RatingUi;

    constructor(data: any) {
        this.supplierId = data.supplierId;
        this.supplierAddress = data.suppliconfigerAddress;
        this.supplierName = data.supplierName;
        this.walletAddress = data.walletAddress;
        this.ratings = data.ratings;
        this.averagerating = data.averagerating;
    }
}
