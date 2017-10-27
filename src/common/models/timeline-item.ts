import { RatingUi } from './rating-ui';

import { Moment } from 'moment';

export class TimelineItem {
    blocktime: Moment;
    data: string;
    ratingVerification : string;

    constructor(data: any) {
        this.blocktime = data.blocktime;
        this.data = data.data;
        this.ratingVerification = data.ratingVerification;
    }
}
