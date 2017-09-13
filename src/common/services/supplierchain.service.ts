import { Injectable } from '@angular/core';
import { default as Bluebird } from 'bluebird';
import { default as _ } from 'lodash';
import { utc } from 'moment';

import { ConfigurationProvider } from '../../config/configuration.provider';

import { Stream } from '../models/stream';
import { StreamItem } from '../models/stream-item';
import { StreamKey } from '../models/stream-key';

const multichain = require('multichain-node');

@Injectable()
export class SupplierChainService {
    supplierchain: any;

    constructor(private _configurationProvider: ConfigurationProvider) {
        // Conditional imports
        this.supplierchain = multichain({
            port: this._configurationProvider.port,
            host: this._configurationProvider.host,
            user: this._configurationProvider.username,
            pass: this._configurationProvider.password
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

        return promisified().then((response: any[]) => {
            return _.map(response, (datum: any) => {
                return new Stream(datum);
            });
        });;
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

        return promisified([streamName]).then((response: any[]) => {
            return _.map(response, (datum: any) => {
                return new StreamKey(datum);
            });
        });
    }

    listStreamKeyItems(streamName: string, key: string): Bluebird<any> {
        const promisified = Bluebird.promisify(this.supplierchain.listStreamKeyItems, {
            context: this.supplierchain
        });

        return promisified([streamName, key]).then((response: any[]) => {
            return _.map(response, (datum: any) => {
                return new StreamItem(_.extend(datum, {
                    blocktime: utc(datum.blocktime)
                }));
            });
        });;
    }
}
