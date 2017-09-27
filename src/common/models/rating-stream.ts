export class RatingStream {

     price: number;
     quality: number;
     bid_response: number;
     message_response: number;
     technical: number;

    constructor(data: any) {
        this.price = data.price;
        this.quality= data.quality;
        this.bid_response= data.bid_response;
        this.message_response= data.message_response;
        this.technical= data.technical;
    }
}
