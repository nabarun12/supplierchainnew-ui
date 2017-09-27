export class RatingUi {
    
         publisher : string;
         price: number;
         quality: number;
         bid_response: number;
         message_response: number;
         technical: number;
         total: number;
      
        constructor(data: any) {
            this.publisher = '';
            this.price = 0;
            this.quality= 0;
            this.bid_response= 0;
            this.message_response= 0;
            this.technical= 0;
            this.total = 0;
        }
    }
    