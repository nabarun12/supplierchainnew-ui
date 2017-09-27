import { Component, OnInit } from '@angular/core';
import { default as _ } from 'lodash';

import { AssetBalance } from '../../common/models/asset-balance';
import { Stream } from '../../common/models/stream';
import { StreamItem } from '../../common/models/stream-item';
import { StreamKey } from '../../common/models/stream-key';
import { Supplier } from '../../common/models/supplier';
import { Publisher } from '../../common/models/publisher';

import { SupplierChainService } from '../../common/services/supplierchain.service';
import { SupplierMetaService } from '../../common/services/suppliersmeta.service';

@Component({
    selector: 'app-fileloading',
    templateUrl: './fileloading.component.html',
    styleUrls: ['./fileloading.component.scss']
})
export class FileloadingComponent  {

    constructor(private _supplierChainService: SupplierChainService, private _supplierMetaService: SupplierMetaService) {}

    
   
    
    public uploadFile(files){
       
        this._supplierMetaService
        .uploadFile(files[0])
        .then((rep: String) => {
            console.info(rep);
        })
        .catch((error: Error) => {
            console.error(error);
        }); 
        console.log(files[0].path);
    }

    public downloadFile(){
        
        var downloadPath = 'http://supplierblockchain.us-east-1.elasticbeanstalk.com/supplier/downloadDocument/hello';
        window.open(downloadPath, '_blank', '');
        /* this._supplierMetaService
         .downloadFile()
         .then((rep: String) => {
             console.info(rep);
         })
         .catch((error: Error) => {
             console.error(error);
         }); */
        // console.log(files[0].path);
     }

}
