import {Injectable} from '@angular/core';


@Injectable()
export class LocalStorageService {
    private appStorageName: string = 'gillironds_book_store__';

    constructor() {

    }

    set(key: string, value: string){
        window.localStorage[this.appStorageName + key] = value;
    }
    get(key: string, defaultValue: string) {
        return window.localStorage[this.appStorageName + key] || defaultValue;
    }
    setObject(key: string, value: object) {
        window.localStorage[this.appStorageName + key] = JSON.stringify(value);
    }
    getObject(key: string): object {
        return JSON.parse(window.localStorage[this.appStorageName + key] || '{}');
    }

}