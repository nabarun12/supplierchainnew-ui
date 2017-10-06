import { RatingUi } from './rating-ui';

export class Supplier {
    readonly supplierId?: number;
    readonly supplierAddress: string;
    readonly supplierName: string;
    readonly walletAddress: string;
    readonly comments: string;
    readonly emailAddress: string;
    readonly phoneNo: string;
    readonly isAdmin: number;
    readonly isRegistered: number;
    readonly key: string;
    ratings : RatingUi[];
    averagerating : RatingUi;

    constructor(data: any) {
        this.supplierId = data.supplierId;
        this.supplierAddress = data.supplierAddress;
        this.supplierName = data.supplierName;
        this.walletAddress = data.walletAddress;
        this.ratings = data.ratings;
        this.averagerating = data.averagerating;
        this.comments = data.comments;
        this.emailAddress = data.emailAddress;
        this.phoneNo = data.phoneNo;
        this.isAdmin = data.isAdmin;
        this.isRegistered = data.isRegistered;
        this.key = data.key;
    }
}
