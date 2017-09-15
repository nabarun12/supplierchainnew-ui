import { Injectable } from '@angular/core';
import { default as Bluebird } from 'bluebird';
import { default as _ } from 'lodash';
import { utc } from 'moment';
import 'whatwg-fetch';

import { ConfigurationProvider } from '../../config/configuration.provider';

import { Supplier } from '../models/supplier';

const multichain = require('multichain-node');

const BASE_URL: string = 'http://supplierblockchain.us-east-1.elasticbeanstalk.com';

@Injectable()
export class SupplierMetaService {
    constructor(private _configurationProvider: ConfigurationProvider) {}

    createSupplier(supplier: Supplier): Bluebird<Supplier[]> {
        const requestData: any = _.clone(supplier);

        return Bluebird.resolve(
            fetch(`${BASE_URL}/supplier/addSupplier`, {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        )
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    const error: Error = new Error(response.statusText);
                    throw error;
                }
            })
            .then((response: any[]) => {
                return _.map(response, (datum: any) => {
                    return new Supplier(datum);
                });
            });
    }

    fetchAllSuppliers(): Bluebird<any[]> {
        return Bluebird.resolve(
            fetch(`${BASE_URL}/supplier/findAll`, {
                method: 'GET'
            })
        )
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    const error: Error = new Error(response.statusText);
                    throw error;
                }
            })
            .then((response: any[]) => {
                return _.map(response, (datum: any) => {
                    return new Supplier(datum);
                });
            });
    }

    fetchSupplierByWalletAddress(walletAddress: string): Bluebird<any> {
        return Bluebird.resolve(
            fetch(`${BASE_URL}/supplier/findSupplierByWallet/${walletAddress}`, {
                method: 'GET'
            })
        )
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    const error: Error = new Error(response.statusText);
                    throw error;
                }
            })
            .then((response: any) => {
                return new Supplier(response);
            });
    }
}
