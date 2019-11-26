import {Injectable} from '@angular/core';
import {Book} from "../classes/book.class";
import {OnInit} from "@angular/core";

import {LocalStorageService} from "./local-storage.service";

@Injectable()
export class CartService implements OnInit {
    private list: Book[];

    constructor(private localStorageService: LocalStorageService) {
    }

    ngOnInit() {
        let tempList = this.localStorageService.getObject('books_list');
        if(tempList && Array.isArray(tempList) && tempList.length>0) {
            this.list = <Book[]>tempList;
        }

    }

}