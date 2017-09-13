export class StreamKey {
    readonly key: string;
    readonly items: number;
    readonly confirmed: number;

    constructor(data: any) {
        this.key = data.key;
        this.items = data.items;
        this.confirmed = data.confirmed;
    }
}
