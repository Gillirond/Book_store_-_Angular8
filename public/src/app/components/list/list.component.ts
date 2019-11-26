import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {RequestService} from "../../services/request.service";

import {Book} from "../../classes/book.class";

@Component({
    selector: 'list',
    template: require('./list.component.pug')(),
    styleUrls: []
})
export class ListComponent implements OnInit {
    private books: Book[] = [];

    constructor(private requestService: RequestService) {
    }

    ngOnInit() {
        this.getList();
    }

    getList() {
        let res = this.requestService.send('get', environment.apiUrl + 'books/', {}).subscribe(response => {
                if(response.ans && response.ans=='true') {
                    this.books = <Book[]>response.res; 
                }
            },
            function (error) {
                console.error(error);
            });
    }
}