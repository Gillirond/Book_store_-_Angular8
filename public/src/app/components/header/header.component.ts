import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-header',
    template: require('./header.component.pug')(),
    styleUrls: []
})
export class HeaderComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {

    }
}