import { RatingUi } from './rating-ui';

import { Moment } from 'moment';

export class TimelineItem {
    date: Date;
    dataitem: string;
    ratingVerification : string;
    count : number;

    constructor(data: any) {
        this.date = data.date;
        this.dataitem = data.dataitem;
        this.ratingVerification = data.ratingVerification;
        this.count = data.count;
    }
}
