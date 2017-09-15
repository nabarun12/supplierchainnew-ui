export class Supplier {
    readonly supplierId?: number;
    readonly supplierAddress: string;
    readonly supplierName: string;
    readonly walletAddress: string;

    constructor(data: any) {
        this.supplierId = data.supplierId;
        this.supplierAddress = data.supplierAddress;
        this.supplierName = data.supplierName;
        this.walletAddress = data.walletAddress;
    }
}
