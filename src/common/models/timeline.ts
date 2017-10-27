import { Moment } from 'moment';
import { TimelineItem} from './timeline-item'

export class Timeline{
    blocktime: Moment;
    timelineItems : TimelineItem[];

    constructor(data: any) {
        this.blocktime = data.blocktime;
        this.timelineItems = data.timelineItem;
    }
}
