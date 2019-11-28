export class Book{
    id: number;
    name: string;
    desc: string;
    img: string;
    available: boolean;
    price: number;

    constructor(id: number, name: string, desc: string, img: string, available: boolean, price: number){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.img = img;
        this.available = available;
        this.price = price;
    }
}