import { Injectable } from '@angular/core';
import { default as Bluebird } from 'bluebird';

const multichain = require('multichain-node');

@Injectable()
export class SupplierChainService {
    supplierchain: any;

    constructor() {
        // Conditional imports
        this.supplierchain = multichain({
            port: 9740,
            host: '127.0.0.1',
            user: 'multichainrpc',
            pass: '4X8GGjg1mHQngoGVvmBmagk3U8Ynxtu4nMWo1SRLMpW5'
        });
    }

    getInfo(): Bluebird<any> {
        const promisified = Bluebird.promisify(this.supplierchain.getInfo, {
            context: this.supplierchain
        });

        return promisified();
    }

    listStreams(): Bluebird<any> {
        const promisified = Bluebird.promisify(this.supplierchain.listStreams, {
            context: this.supplierchain
        });

        return promisified();
    }

    getAddresses(): Bluebird<any> {
        const promisified = Bluebird.promisify(this.supplierchain.getAddresses, {
            context: this.supplierchain
        });

        return promisified();
    }

    listStreamKeys(streamName: string): Bluebird<any> {
        const promisified = Bluebird.promisify(this.supplierchain.listStreamKeys, {
            context: this.supplierchain
        });

        return promisified({
            stream: streamName
        });
    }
}
