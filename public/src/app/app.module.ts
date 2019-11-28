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

import {AdminGuard} from "./guards/admin.guard";
import {AdminModule} from "./components/admin/admin.module";

const appRoutes: Routes = [
    {path: '', component: ListComponent},
    {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
    {path: '**', redirectTo: '/'}
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, AdminModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, ListComponent, HeaderComponent],
    bootstrap: [AppComponent],
    providers: [RequestService, LocalStorageService, CartService,
                AdminGuard]
})
export class AppModule {
}