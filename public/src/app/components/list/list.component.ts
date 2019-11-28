import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {RequestService} from "../../services/request.service";

import {Book} from "../../classes/book.class";
import {CartService} from "../../services/cart.service";

@Component({
    selector: 'list',
    template: require('./list.component.pug')(),
    styleUrls: []
})
export class ListComponent implements OnInit {
    private books: Book[] = [];

    constructor(private requestService: RequestService, private cartService: CartService) {
    }

    ngOnInit() {
        this.getList();
    }

    getList() {
        let res = this.requestService.send('get', environment.apiUrl + 'books/', {}).subscribe(response => {
                if(response.ans && response.ans=='true') {
                    this.books = (<Book[]>response.res).filter(function(book: Book) {return book.available});
                }
            },
            function (error) {
                console.error(error);
            });
    }

    addToCart(book: Book) {
        this.cartService.addToCart(book);
    }
}