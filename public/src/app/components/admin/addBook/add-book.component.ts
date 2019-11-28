import {Component, OnInit, OnDestroy} from '@angular/core';
import {Book} from "../../../classes/book.class";
import {environment} from "../../../../environments/environment";
import {RequestService} from "../../../services/request.service";
import {Observable} from "rxjs/internal/Observable";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
    selector: 'app-add-book',
    template: require('./add-book.component.pug')(),
    styleUrls: []
})
export class AddBookComponent implements OnInit, OnDestroy {
    private isOpen: boolean = false;
    private form: Book = <Book>{};

    private postResult: Subscription;

    constructor(private requestService: RequestService) {
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.postResult.unsubscribe();
    }

    callback: () => void;

    openAddForm(callback: () => void) {
        this.isOpen = true;
        this.callback = callback || function () {
        };
        this.clearForm();
        this.openWindow();
    }

    private idWrapper: string = 'add-book-wrapper';

    openWindow() {
        document.body.style.overflow = "hidden";
        document.getElementById(this.idWrapper).style.display = "block";
    }

    closeWindow() {
        this.isOpen = false;
        document.body.style.overflow = "";
        document.getElementById(this.idWrapper).style.display = "none";
    }

    addBook() {
        this.postResult = this.requestService.send('post', environment.apiUrl + 'books/', this.form).subscribe(response => {
                if (response.ans && response.ans == 'true') {
                    alert('Book \'' + response.res.name + '\' was added!');
                    this.closeWindow();
                    this.callback();
                }
            },
            function (error) {
                console.error(error);
            });
    }

    clearForm() {
        Object.keys(this.form).forEach(k => {
            delete this.form[k];
        });
    }
}