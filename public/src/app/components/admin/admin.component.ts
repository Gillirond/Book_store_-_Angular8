import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Book} from "../../classes/book.class";
import {RequestService} from "../../services/request.service";
import {EditBookComponent} from "./editBook/edit-book.component";
import {Subscription} from "rxjs/internal/Subscription";
import {AddBookComponent} from "./addBook/add-book.component";

@Component({
    selector: 'admin',
    template: require('./admin.component.pug')(),
    styleUrls: []
})
export class AdminComponent implements OnInit, OnDestroy {
    @ViewChild(AddBookComponent, {static: false})
    private addBookComponent: AddBookComponent;
    @ViewChild(EditBookComponent, {static: false})
    private editBookComponent: EditBookComponent;
    private books: Book[] = [];

    private deleteBookResult: Subscription;
    private getBooksResult: Subscription;

    constructor(private requestService: RequestService) {

    }

    ngOnInit() {
        this.getList();
    }

    ngOnDestroy() {
        this.deleteBookResult.unsubscribe();
        this.getBooksResult.unsubscribe();
    }

    getList() {
        this.getBooksResult = this.requestService.send('get', environment.apiUrl + 'books/', {}).subscribe(response => {
                if(response.ans && response.ans=='true') {
                    this.books = <Book[]>response.res;
                }
            },
            function (error) {
                console.error(error);
            });
    }

    addBook() {
        let self = this;
        this.addBookComponent.openAddForm(function() {
            self.getList();
        });
    }

    editBook(book: Book) {
        let self = this;
        this.editBookComponent.openEditForm(book, function() {
            self.getList();
        });
    }

    deleteBook(book: Book) {
        let bookIndex = this.books.indexOf(book);
        this.books.slice(bookIndex, 1);

        this.deleteBookResult = this.requestService.send('delete', environment.apiUrl + 'books/' + book.id, {}).subscribe(response => {
                if(response.ans && response.ans=='true') {
                    console.log('book was deleted');
                }
            },
            function (error) {
                console.error(error);
            });
    }
}