import { Component, OnInit } from '@angular/core';
import { default as _ } from 'lodash';

import { AssetBalance } from '../../common/models/asset-balance';
import { Stream } from '../../common/models/stream';
import { StreamItem } from '../../common/models/stream-item';
import { StreamKey } from '../../common/models/stream-key';
import { Supplier } from '../../common/models/supplier';
import { Publisher } from '../../common/models/publisher';
import { RatingUi } from '../../common/models/rating-ui';

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
    publishers: Publisher[] = [];
    ratingLocal : RatingUi = null;
    fromAddress : string;
    toAddress : string;
    streamName : string;

    convertObjectToHex(object : any) {

        //this.ratingLocal = new RatingUi(0);
        //this.ratingLocal.bid_response = 5;
        //this.ratingLocal.message_response = 4;
        //this.ratingLocal.price = 3;
        //this.ratingLocal.quality = 4;
        //this.ratingLocal.technical = 2;
        //this.ratingLocal.total = 3.5;
        //var ratingFunc = this.ratingLocal;
        var normalstring = JSON.stringify(object);
        var hexstring = Buffer.from(normalstring).toString('hex');
        return hexstring;
       // console.info(normalstring);
        //console.info(hexstring.toString());
       // console.info(JSON.parse(Buffer.from(hexstring,'hex').toString()));
    

    }
    convertHexToObject(hexdata : string){
       return JSON.parse(Buffer.from(hexdata,'hex').toString());

    }

    constructor(private _supplierChainService: SupplierChainService, private _supplierMetaService: SupplierMetaService) {}

    publishFrom(){
        this.ratingLocal = new RatingUi(0);
        this.ratingLocal.bid_response = 3;
        this.ratingLocal.message_response = 4;
        this.ratingLocal.price = 3;
        this.ratingLocal.quality = 4;
        this.ratingLocal.technical = 2;
        this.ratingLocal.total = 3.5;
        this.ratingLocal.publisher = this.fromAddress;
        var ratingFunc = this.ratingLocal;

        this._supplierChainService
        .publishfrom(this.fromAddress,this.streamName,this.toAddress,this.convertObjectToHex(ratingFunc))
        .then((res : any) => {
            console.info(res);
            this._supplierChainService
            .listStreamKeyItems('testin',this.toAddress)
            .then((items: StreamItem[]) => {
                this.streamItems = items;
                this.organizeDataBySupplier();
                console.info(this.registeredSuppliers);

            })
            .catch((error: Error) => {
                console.error(error);
            });
        })
        .catch((error: Error) => {
            console.error(error);
        });

    }

    organizeDataBySupplier(){

        var rating,supplier,index;;
        //this.registeredSuppliers.
        this.convertHexToObject
        this.streamItems.forEach(streamItem => {
            
            supplier = _.find(this.registeredSuppliers, (datum: Supplier) => {
                return streamItem.key == datum.walletAddress;
            });
            if(supplier.ratings == undefined){
                supplier.ratings = new Array<RatingUi>();
                rating = new RatingUi(0);
                rating =this.convertHexToObject(streamItem.data);
                supplier.ratings.push(rating);

            }
            else{
             
             index = supplier.ratings.findIndex(rating => rating.publisher == streamItem.publishers[0]);
                 
             if(index < 0){
                     rating = new RatingUi(0);
                     rating = this.convertHexToObject(streamItem.data);
                     supplier.ratings.push(rating);
                 }
                 else{
                    supplier.ratings[index] = this.convertHexToObject(streamItem.data);
                   
                 }

            }
            

        })
    }
    
    ngOnInit() {
        //this.convertObjectToHex();
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
                    .listStreamitems('testin')
                    .then((items: StreamItem[]) => {
                        this.streamItems = items;
                        this.organizeDataBySupplier();
                        console.info(this.registeredSuppliers);

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
               

                console.info(this.registeredSuppliers);


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
        
        this._supplierChainService
            .listStreamPublishers('stream1')
            .then((publisher: Publisher[]) => {
                 this.publishers = publisher;
                })
            .catch((error: Error) => {
                    console.error(error);
                });
    }
}
