import {Book} from "./book.class";

export class CartItem{
    id: number;
    count: number;
    book: Book;

    constructor(id: number, count: number, book: Book) {
        this.id = id;
        this.count = count;
        this.book = book;
    }
}