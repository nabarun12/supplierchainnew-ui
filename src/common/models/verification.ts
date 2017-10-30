export class Verification {
    
         suppliername : string;
         verified : boolean;
         timeofrating: number;
      
        constructor(data: any) {
            
            this.suppliername = data.suppliername;
            this.verified = data.verified;
            this.timeofrating = 0
        };

    }
    