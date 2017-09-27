export class Publisher {
    readonly confirmed: number;
    readonly items: number;
    readonly publisher: string;
    

    constructor(data: any) {
        this.confirmed = data.confirmed;
        this.items = data.items;
        this.publisher = data.publisher;
        
    }
}
