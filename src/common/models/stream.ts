export class Stream {
    readonly confirmed: number;
    readonly createtxid: string;
    readonly items: number;
    readonly keys: number;
    readonly name: string;
    readonly open: boolean;
    readonly publishers: number;
    readonly streamref: string;
    readonly subscribed: boolean;
    readonly synchronized: boolean;

    constructor(data: any) {
        this.confirmed = data.confirmed;
        this.createtxid = data.createtxid;
        this.items = data.items;
        this.keys = data.keys;
        this.name = data.name;
        this.open = data.open;
        this.publishers = data.publishers;
        this.streamref = data.streamref;
        this.subscribed = data.subscribed;
        this.synchronized = data.synchronized;
    }
}
