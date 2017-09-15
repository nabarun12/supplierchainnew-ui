import { Component, OnInit } from '@angular/core';
import { default as _ } from 'lodash';

import { AssetBalance } from '../../common/models/asset-balance';
import { Stream } from '../../common/models/stream';
import { StreamItem } from '../../common/models/stream-item';
import { StreamKey } from '../../common/models/stream-key';
import { Supplier } from '../../common/models/supplier';

import { SupplierChainService } from '../../common/services/supplierchain.service';
import { SupplierMetaService } from '../../common/services/suppliersmeta.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    chainInfo: any = null;
    addresses: string[] = [];
    streamItems: StreamItem[] = [];
    assetBalances: AssetBalance[] = [];
    registeredSuppliers: Supplier[] = [];
    supplierMatchingWithWallet: Supplier = null;

    constructor(private _supplierChainService: SupplierChainService, private _supplierMetaService: SupplierMetaService) {}

    ngOnInit() {
        this._supplierMetaService
            .fetchAllSuppliers()
            .then((suppliers: Supplier[]) => {
                this.registeredSuppliers = suppliers;

                this._supplierChainService
                    .getAddresses()
                    .then((addresses: string[]) => {
                        this.addresses = addresses;

                        this.supplierMatchingWithWallet = _.find(this.registeredSuppliers, (datum: Supplier) => {
                            return _.indexOf(this.addresses, datum.walletAddress) >= 0;
                        });
                    })
                    .catch((error: Error) => {
                        console.error(error);
                    });

                this._supplierChainService
                    .listStreams()
                    .then((streams: any[]) => {
                        console.info(streams);
                    })
                    .catch((error: Error) => {
                        console.error(error);
                    });

                this._supplierChainService
                    .listStreamKeys('stream1')
                    .then((keys: any[]) => {
                        console.info(keys);
                    })
                    .catch((error: Error) => {
                        console.error(error);
                    });

                this._supplierChainService
                    .listStreamKeyItems('stream1', 'key1')
                    .then((items: StreamItem[]) => {
                        this.streamItems = items;
                    })
                    .catch((error: Error) => {
                        console.error(error);
                    });

                this._supplierChainService
                    .getTotalBalances()
                    .then((balances: AssetBalance[]) => {
                        this.assetBalances = balances;
                    })
                    .catch((error: Error) => {
                        console.error(error);
                    });
            })
            .catch((error: Error) => {
                console.error(error);
            });

        this._supplierChainService
            .getInfo()
            .then((info: any) => {
                console.info(info);
                this.chainInfo = info;
            })
            .catch((error: Error) => {
                console.error(error);
            });
    }
}
