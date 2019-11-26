import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AdminComponent }   from './admin.component';

@NgModule({
    imports:      [ BrowserModule, FormsModule ],
    declarations: [ AdminComponent ],
    exports:    [ AdminComponent ]
})
export class AdminModule { }