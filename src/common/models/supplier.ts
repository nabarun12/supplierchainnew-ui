import { RatingUi } from './rating-ui';

export class Supplier {
     supplierId: number;
     supplierAddress: string;
     supplierName: string;
     walletAddress: string;
     comments: string;
     emailAddress: string;
     phoneNo: string;
     isAdmin: number;
     isRegistered: number;
     key: string;
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
