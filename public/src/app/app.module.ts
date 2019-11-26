import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {Routes, RouterModule} from "@angular/router";

import {HttpClientModule} from "@angular/common/http";

import './scss/index.scss';

import {AppComponent} from './app.component';
import {ListComponent} from "./components/list/list.component";
import {AdminComponent} from "./components/admin/admin.component";
import {HeaderComponent} from "./components/header/header.component";

import {RequestService} from "./services/request.service";
import {LocalStorageService} from "./services/local-storage.service";
import {CartService} from "./services/cart.service";

const appRoutes: Routes = [
    {path: '', component: ListComponent},
    {path: 'admin', component: AdminComponent},
    {path: '**', redirectTo: '/'}
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, ListComponent, AdminComponent, HeaderComponent],
    bootstrap: [AppComponent],
    providers: [RequestService, LocalStorageService, CartService]
})
export class AppModule {
}