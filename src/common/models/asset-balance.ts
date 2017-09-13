export class AssetBalance {
    readonly name: string;
    readonly assetref: string;
    readonly qty: number;

    constructor(data: any) {
        this.name = data.name;
        this.assetref = data.assetref;
        this.qty = data.qty;
    }
}
