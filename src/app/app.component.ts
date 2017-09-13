import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { SupplierChainService } from './providers/supplierchain.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(public electronService: ElectronService, private _supplierChainService: SupplierChainService) {
        if (electronService.isElectron()) {
            console.log('Mode electron');
            // Check if electron is correctly injected (see externals in webpack.config.js)
            console.log('c', electronService.ipcRenderer);
            // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
            console.log('c', electronService.childProcess);
        } else {
            console.log('Mode web');
        }

        this._supplierChainService
            .listStreams()
            .then((streams: any[]) => {
                console.info(streams);
            })
            .catch((error: Error) => {
                console.error(error);
            });

        this._supplierChainService
            .getAddresses()
            .then((addresses: any[]) => {
                console.info(addresses);
            })
            .catch((error: Error) => {
                console.error(error);
            });

        this._supplierChainService
            .listStreamKeys("stream1")
            .then((keys: any[]) => {
                console.info(keys);
            })
            .catch((error: Error) => {
                console.error(error);
            });

        this._supplierChainService
            .listStreamKeyItems("stream1", "key1")
            .then((items: any[]) => {
                console.info(items);
            })
            .catch((error: Error) => {
                console.error(error);
            });
    }
}
