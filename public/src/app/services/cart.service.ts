import {Injectable} from '@angular/core';
import {CartItem} from "../classes/cart-item.class";
import {Book} from "../classes/book.class";
import {OnInit} from "@angular/core";

import {LocalStorageService} from "./local-storage.service";

@Injectable()
export class CartService implements OnInit {
    private list: CartItem[];
    private cartListStorageName: string = 'cart_list';

    constructor(private localStorageService: LocalStorageService) {
    }

    ngOnInit() {
        let tempList = this.localStorageService.getObject(this.cartListStorageName);
        if(tempList && Array.isArray(tempList) && tempList.length>0) {
            this.list = <CartItem[]>tempList;
        }
    }

    addToCart(book: Book) {
        let indexInList = this.list.map(cartItem => cartItem.book.id).indexOf(book.id);
        if(indexInList != -1) {
            this.list[indexInList].count++;
        } else {
            let lastId = 0;
            this.list.forEach(item => {
                if(item.id > lastId) lastId = item.id;
            });
            this.list.push(new CartItem(lastId + 1, 1, book));
        }

        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        this.localStorageService.setObject(this.cartListStorageName, this.list);
    }

}