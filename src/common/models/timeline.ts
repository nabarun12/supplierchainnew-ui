import { Moment } from 'moment';
import { TimelineItem} from './timeline-item'

export class Timeline{
    monthdayyear: string;
    month : string;
    day : string;
    year : string;
    timelineItems : TimelineItem[];

    constructor(data: any) {
        this.monthdayyear = data.monthdayyear;
        this.timelineItems = data.timelineItem;
    }
}
