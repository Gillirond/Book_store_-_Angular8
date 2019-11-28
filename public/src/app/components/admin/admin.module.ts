import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AdminComponent} from './admin.component';
import {AddBookComponent} from "./addBook/add-book.component";
import {EditBookComponent} from "./editBook/edit-book.component";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [AdminComponent, EditBookComponent, AddBookComponent],
    exports: [AdminComponent]
})
export class AdminModule {
}