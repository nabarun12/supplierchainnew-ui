import { Component, OnInit } from '@angular/core';

import { Stream } from '../../common/models/stream';
import { StreamItem } from '../../common/models/stream-item';
import { StreamKey } from '../../common/models/stream-key';

import { SupplierChainService } from '../../common/services/supplierchain.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    addresses: string[] = [];
    streamItems: StreamItem[] = [];

    constructor(private _supplierChainService: SupplierChainService) {}

    ngOnInit() {

        this._supplierChainService
            .getAddresses()
            .then((addresses: string[]) => {
                this.addresses = addresses
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
    }
}
