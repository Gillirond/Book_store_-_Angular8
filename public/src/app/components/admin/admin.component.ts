import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'admin',
    template: require('./admin.component.pug')(),
    styleUrls: []
})
export class AdminComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {

    }
}