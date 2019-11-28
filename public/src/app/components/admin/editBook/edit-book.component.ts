import {Component, OnInit, OnDestroy} from '@angular/core';
import {Book} from "../../../classes/book.class";
import {environment} from "../../../../environments/environment";
import {RequestService} from "../../../services/request.service";
import {Observable} from "rxjs/internal/Observable";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
    selector: 'app-edit-book',
    template: require('./edit-book.component.pug')(),
    styleUrls: []
})
export class EditBookComponent implements OnInit, OnDestroy {
    private isOpen: boolean = false;
    private form: Book = <Book>{};
    private formDefault: Book = <Book>{};

    private putResult: Subscription;

    constructor(private requestService: RequestService) {
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.putResult.unsubscribe();
    }

    callback: () => void;

    openEditForm(book: Book, callback: () => void) {
        this.isOpen = true;
        this.callback = callback || function () {
        };
        this.clearForm();
        this.form = <Book> JSON.parse(JSON.stringify(book));
        this.formDefault = <Book> JSON.parse(JSON.stringify(book));
        this.openWindow();
    }

    private idWrapper: string = 'edit-book-wrapper';

    openWindow() {
        document.body.style.overflow = "hidden";
        document.getElementById(this.idWrapper).style.display = "block";
    }

    closeWindow() {
        this.isOpen = false;
        document.body.style.overflow = "";
        document.getElementById(this.idWrapper).style.display = "none";
    }

    saveBook() {
        this.putResult = this.requestService.send('put', environment.apiUrl + 'books/' + this.form.id, this.form).subscribe(response => {
                if (response.ans && response.ans == 'true') {
                    alert('Book \'' + this.form.name + '\' was saved!');
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
        Object.keys(this.formDefault).forEach(k => {
            delete this.formDefault[k];
        });
    }
}