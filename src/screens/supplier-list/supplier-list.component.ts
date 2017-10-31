import { Component, OnInit } from '@angular/core';
import { OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent } from "angular-star-rating";
import { default as _ } from 'lodash';
import { AssetBalance } from '../../common/models/asset-balance';
import { Stream } from '../../common/models/stream';
import { StreamItem } from '../../common/models/stream-item';
import { StreamKey } from '../../common/models/stream-key';
import { Supplier } from '../../common/models/supplier';
import { Publisher } from '../../common/models/publisher';
import { RatingUi } from '../../common/models/rating-ui';
import { TimelineItem } from '../../common/models/timeline-item';
import { Timeline } from '../../common/models/timeline';
import { SupplierChainService } from '../../common/services/supplierchain.service';
import { SupplierMetaService } from '../../common/services/suppliersmeta.service';
import '../../../node_modules/jquery/dist/jquery.min.js'
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { AppGlobals } from '../../common/models/global';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import { SignupPageComponent } from '../../screens/signup-page/signup-page.component';



@Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html',
    styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {
    items: any;

    avgRating: number = 0;
    publisher: string;
    price: number = 0;
    quality: number = 0;
    bidResponse: number = 0;
    messageResponse: number = 0;
    technical: number = 0;
    total: number = 0;
    errorinRating: string = "";
    messageinRating: string = "";



    chainInfo: any = null;
    addresses: string[] = [];
    streamItems: StreamItem[] = [];
    streamItemtimelines: StreamItem[] = [];
    assetBalances: AssetBalance[] = [];
    registeredSuppliers: Supplier[] = [];
    supplierMatchingWithWallet: Supplier = null;
    publishers: Publisher[] = [];
    ratingLocal: RatingUi = null;
    fromAddress: string;
    toAddress: string;
    streamName: string;
    ratings: Number[] = [1, 2, 3, 4, 5];
    priceRating: Number = 0;
    qualityRating: Number = 0;
    bidresponseRating: Number = 0;
    msgresponseRating: Number = 0;
    techcapabilityRating: Number = 0;
    reviews: string = '';
    toggleIcon: boolean = true;
    supplierLocal: Supplier = null;
    loaderInd: boolean = false;
    timelines: Timeline[] = null;
    loaderIndCollapse: boolean = false;
    

    loadTimeline() {

        var i = 0;
        var ratingLocal = new RatingUi('');
        this.timelines = new Array<Timeline>();
        var fromSupplier, toSupplier;
        var timelineLocal: Timeline;
        var timelineLocalItem: TimelineItem;
       this.loaderIndCollapse = true;
        this._supplierChainService
        .listStreamitems('ratingsystemtesting')
        .then((items: StreamItem[]) => {
        this.streamItemtimelines = items;
      
        this.streamItemtimelines.forEach(streamItem => {

            ratingLocal = this.convertHexToObject(streamItem.data);
            var date = new Date(ratingLocal.timeofrating).getDate() + '-' + new Date(ratingLocal.timeofrating).getMonth() + 1 + '-' + new Date(ratingLocal.timeofrating).getFullYear();
            fromSupplier = _.find(this.registeredSuppliers, (datum: Supplier) => {
                return streamItem.publishers[0] == datum.walletAddress;
            });
            toSupplier = _.find(this.registeredSuppliers, (datum: Supplier) => {
                return streamItem.key == datum.walletAddress;
            });

            timelineLocal = _.find(this.timelines, (datum: Timeline) => {
                return date == datum.monthdayyear;
            });

            if (timelineLocal == undefined) {

                timelineLocal = new Timeline('');
                timelineLocal.monthdayyear = date;
                timelineLocal.day =new Date(ratingLocal.timeofrating).getDate().toString();
                timelineLocal.month = new Date(ratingLocal.timeofrating).toLocaleString('en-us', { month: "long" }).substr(0,3).toUpperCase();
                timelineLocal.year = new Date(ratingLocal.timeofrating).getFullYear().toString();
                timelineLocalItem = new TimelineItem('');
                timelineLocalItem.dataitem = fromSupplier.supplierName + " rated " + toSupplier.supplierName + " " + ratingLocal.total;
                timelineLocalItem.date = new Date(ratingLocal.timeofrating);
                timelineLocalItem.ratingVerification = "Rating";
                if(timelineLocal.timelineItems == undefined)
                  timelineLocal.timelineItems = new  Array<TimelineItem>(); 
                timelineLocalItem.count=timelineLocal.timelineItems==undefined? 0 : timelineLocal.timelineItems.length;
                timelineLocal.timelineItems.push(timelineLocalItem);
                this.timelines.push(timelineLocal);
            }
            else {
                timelineLocalItem = new TimelineItem('');
                timelineLocalItem.dataitem = fromSupplier.supplierName + " rated " + toSupplier.supplierName + " " + ratingLocal.total;
                timelineLocalItem.date = new Date(ratingLocal.timeofrating);
                timelineLocalItem.ratingVerification = "Rating";
                if(timelineLocal.timelineItems == undefined)
                timelineLocal.timelineItems = new  Array<TimelineItem>();
                timelineLocalItem.count=timelineLocal.timelineItems==undefined? 0 : timelineLocal.timelineItems.length;
                timelineLocal.timelineItems.push(timelineLocalItem);

            }
        })
        this.signupPageComponent.delay(1000).then(() => { this.loaderIndCollapse = false;})
        
    })
    .catch((error: Error) => {
        this.loaderIndCollapse = false;
        console.error(error);
    });
        
    

    }

    setVal(ratingCurr: Number, ratingType: string) {
        // alert('hola');
        switch (ratingType) {
            case 'price':
                this.priceRating = ratingCurr.valueOf();
                break;
            case 'quality':
                this.qualityRating = ratingCurr.valueOf();
                break;
            case 'bdrspns':
                this.bidresponseRating = ratingCurr.valueOf();
                break;
            case 'msgrspns':
                this.msgresponseRating = ratingCurr.valueOf();
                break;
            case 'tchcap':
                this.techcapabilityRating = ratingCurr.valueOf();
                break;
            default:
                break;

            //alert(this.priceRating);
        }

    }

    setClasses(ratingCurr: Number, averageratingIn: RatingUi) {
        //  alert(ratingSupp);
        var ratingSupp: Number = averageratingIn == undefined ? 0 : averageratingIn.total;
        let classes = {

            'fa-star': !((ratingSupp.valueOf() - ratingCurr.valueOf()) > -1 && (ratingSupp.valueOf() - ratingCurr.valueOf()) < 0),
            'staryellow': (ratingSupp.valueOf() - ratingCurr.valueOf()) >= 0 || ((ratingSupp.valueOf() - ratingCurr.valueOf()) > -1 && (ratingSupp.valueOf() - ratingCurr.valueOf()) < 0),
            'fa-star-half-o': (ratingSupp.valueOf() - ratingCurr.valueOf()) > -1 && (ratingSupp.valueOf() - ratingCurr.valueOf()) < 0,
        }
        return classes;

    }
    convertObjectToHex(object: any) {


        var normalstring = JSON.stringify(object);
        var hexstring = Buffer.from(normalstring).toString('hex');
        return hexstring;



    }
    convertHexToObject(hexdata: string) {
        return JSON.parse(Buffer.from(hexdata, 'hex').toString());

    }

    constructor(private _supplierChainService: SupplierChainService, private _supplierMetaService: SupplierMetaService
        , private _router: Router, private _globals: AppGlobals, private signupPageComponent:SignupPageComponent) { }

    printName(supplieraddress: string) {

        this.supplierLocal = _.find(this.registeredSuppliers, (datum: Supplier) => {
            return this._globals.getLoggedSupplier().supplierName == datum.supplierName;
        });

        this.fromAddress = this.supplierLocal.walletAddress;
        this.toAddress = supplieraddress;
        this.errorinRating = "";
        if (this.fromAddress == this.toAddress) {
            this.fromAddress = "";
            this.toAddress = "";
            this.errorinRating = "You cannot rate yourself";

        }

        else {

            document.getElementById("openModalButton").click();
        }


    }
    collapseTimelines() {
        this.toggleIcon=!this.toggleIcon;
        this.loadTimeline();
        
          
    }


    clearRating() {

        this.priceRating = 0;
        this.qualityRating = 0;
        this.bidresponseRating = 0;
        this.msgresponseRating = 0;
        this.techcapabilityRating = 0;
        this.reviews = '';
        this.fromAddress = "";
        this.toAddress = "";
        this.errorinRating = "";
        this.messageinRating = "";


    }

    returnAverage() {

        return (this.bidresponseRating.valueOf() + this.msgresponseRating.valueOf()
            + this.priceRating.valueOf() + this.qualityRating.valueOf() + this.techcapabilityRating.valueOf()) / 5;

    }

    publishFrom() {

        this.ratingLocal = new RatingUi(0);
        this.ratingLocal.bid_response = this.bidresponseRating.valueOf();
        this.ratingLocal.message_response = this.msgresponseRating.valueOf();
        this.ratingLocal.price = this.priceRating.valueOf();
        this.ratingLocal.quality = this.qualityRating.valueOf();
        this.ratingLocal.technical = this.techcapabilityRating.valueOf();
        this.ratingLocal.total = this.returnAverage();
        this.ratingLocal.reviews = this.reviews;
        this.ratingLocal.publisher = this.fromAddress;
        this.ratingLocal.timeofrating = Date.now();
        var ratingFunc = this.ratingLocal;
        this.loaderInd = true;
        this._supplierChainService
            .publishfrom(this.fromAddress, 'ratingsystemtesting', this.toAddress, this.convertObjectToHex(ratingFunc))
            .then((res: any) => {
                console.info(res);
                this._supplierChainService
                    .listStreamKeyItems('ratingsystemtesting', this.toAddress)
                    .then((items: StreamItem[]) => {
                        this.streamItems = items;
                        this.organizeDataBySupplier();
                        console.info(this.registeredSuppliers);
                        this.loaderInd = false;
                        this.messageinRating = "You have rated succesfully";
                        this.loadTimeline();
                    })
                    .catch((error: Error) => {
                        this.loaderInd = false;
                        console.error(error);
                    });
            })
            .catch((error: Error) => {
                this.loaderInd = false;
                console.error(error);
            });

    }




    organizeDataBySupplier() {

        var index;
        var rating = new RatingUi('');
        var counter = new Array();
        var supplier = new Supplier('');
        var ts = Date.now();
        var m: Moment;
        // m(ts)
        //this.registeredSuppliers.
        this.convertHexToObject
        this.streamItems.forEach(streamItem => {

            console.info("here now" + ts);
            console.info("here" + new Date(streamItem.blocktime).getDate() + '-' + new Date(streamItem.blocktime).getMonth() + 1 + '-' + new Date(streamItem.blocktime).getFullYear());
            supplier = _.find(this.registeredSuppliers, (datum: Supplier) => {
                return streamItem.key == datum.walletAddress;
            });
            if (supplier.ratings == undefined) {
                supplier.ratings = new Array<RatingUi>();
                rating = new RatingUi(0);
                supplier.averagerating = new RatingUi(0);
                rating = this.convertHexToObject(streamItem.data);
                rating.count = 1;
                supplier.ratings.push(rating);
                supplier.averagerating = rating;
                supplier.averagerating.count = 1;

            }
            else {

                index = supplier.ratings.findIndex(rating => rating.publisher == streamItem.publishers[0]);

                if (index < 0) {
                    rating = new RatingUi(0);
                    rating = this.convertHexToObject(streamItem.data);
                    rating.count = 1;
                    supplier.ratings.push(rating);
                    supplier.averagerating.bid_response = ((supplier.averagerating.bid_response * supplier.averagerating.count) + rating.bid_response) / (supplier.averagerating.count + 1);
                    supplier.averagerating.message_response = ((supplier.averagerating.message_response * supplier.averagerating.count) + rating.message_response) / (supplier.averagerating.count + 1);
                    supplier.averagerating.price = ((supplier.averagerating.price * supplier.averagerating.count) + rating.price) / (supplier.averagerating.count + 1);
                    supplier.averagerating.quality = ((supplier.averagerating.quality * supplier.averagerating.count) + rating.quality) / (supplier.averagerating.count + 1);
                    supplier.averagerating.technical = ((supplier.averagerating.technical * supplier.averagerating.count) + rating.technical) / (supplier.averagerating.count + 1);
                    supplier.averagerating.total = ((supplier.averagerating.total * supplier.averagerating.count) + rating.total) / (supplier.averagerating.count + 1);
                    supplier.averagerating.count += 1;


                }
                else {

                    rating = this.convertHexToObject(streamItem.data);
                    supplier.ratings[index].bid_response = ((supplier.ratings[index].bid_response * supplier.ratings[index].count) + rating.bid_response) / (supplier.ratings[index].count + 1);
                    supplier.ratings[index].message_response = ((supplier.ratings[index].message_response * supplier.ratings[index].count) + rating.message_response) / (supplier.ratings[index].count + 1);
                    supplier.ratings[index].price = ((supplier.ratings[index].price * supplier.ratings[index].count) + rating.price) / (supplier.ratings[index].count + 1);
                    supplier.ratings[index].quality = ((supplier.ratings[index].quality * supplier.ratings[index].count) + rating.quality) / (supplier.ratings[index].count + 1);
                    supplier.ratings[index].technical = ((supplier.ratings[index].technical * supplier.ratings[index].count) + rating.technical) / (supplier.ratings[index].count + 1);
                    supplier.ratings[index].total = ((supplier.ratings[index].total * supplier.ratings[index].count) + rating.total) / (supplier.ratings[index].count + 1);
                    supplier.ratings[index].reviews = rating.reviews;
                    supplier.averagerating.bid_response = ((supplier.averagerating.bid_response * supplier.averagerating.count) + rating.bid_response) / (supplier.averagerating.count + 1);
                    supplier.averagerating.message_response = ((supplier.averagerating.message_response * supplier.averagerating.count) + rating.message_response) / (supplier.averagerating.count + 1);
                    supplier.averagerating.price = ((supplier.averagerating.price * supplier.averagerating.count) + rating.price) / (supplier.averagerating.count + 1);
                    supplier.averagerating.quality = ((supplier.averagerating.quality * supplier.averagerating.count) + rating.quality) / (supplier.averagerating.count + 1);
                    supplier.averagerating.technical = ((supplier.averagerating.technical * supplier.averagerating.count) + rating.technical) / (supplier.averagerating.count + 1);
                    supplier.averagerating.total = ((supplier.averagerating.total * supplier.averagerating.count) + rating.total) / (supplier.averagerating.count + 1);
                    supplier.ratings[index].count += 1;
                    supplier.averagerating.count += 1;


                }

            }


        })

    }

    viewProfile(supplierThis: Supplier) {
        var rating, supplier, index;
        //this.registeredSuppliers.
        alert(supplierThis);
        this._globals.setPassedSupplier(supplierThis);
        this._router.navigateByUrl('supplier-details');
        console.log(supplierThis);


    }


    ngOnInit() {
        this.items = ['1', '2', '3', '4'];

        this._supplierMetaService
            .fetchAllSuppliers()
            .then((suppliers: Supplier[]) => {
                this.registeredSuppliers = suppliers;
                this._globals.setRegisteredSupplier(this.registeredSuppliers);
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
                    .listStreamKeys('ratingsystemtesting')
                    .then((keys: any[]) => {
                        console.info(keys);
                    })
                    .catch((error: Error) => {
                        console.error(error);
                    });

                this._supplierChainService
                    .listStreamitems('ratingsystemtesting')
                    .then((items: StreamItem[]) => {
                        this.streamItems = items;
                        this.organizeDataBySupplier();
                        this._globals.setSupplier(_.find(this.registeredSuppliers, (datum: Supplier) => {
                            return this._globals.getLoggedSupplier().supplierName == datum.supplierName;
                        }));
                        
                        console.info(this.registeredSuppliers);
                       // this.loadTimeline();

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
            .listStreamPublishers('ratingsystemtesting')
            .then((publisher: Publisher[]) => {
                this.publishers = publisher;
            })
            .catch((error: Error) => {
                console.error(error);
            });
    }



    public checkRating() {
        this.total = this.price + this.quality + this.bidResponse + this.messageResponse + this.technical;
        this.avgRating = this.total / 5;
        console.log("hello");

    }



}
