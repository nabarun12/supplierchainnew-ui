import { Moment } from 'moment';

export class PublisherItems {
    readonly blocktime: Moment;
    readonly confirmations: number;
    readonly data: string;
    readonly key: string;
    readonly publishers: string[];
    readonly txid: string;

    constructor(data: any) {
        this.blocktime = data.blocktime;
        this.confirmations = data.confirmations;
        this.data = data.data;
        this.key = data.key;
        this.publishers = data.publishers;
        this.txid = data.txid;
    }
}
