import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { Item } from './item.model';
import { Product } from './product.model';

@Injectable()
export class InventoryService {


    constructor() {
    }
    inventroyList = new Subject<Item[]>();

    private items: Item[] = [
        new Item(
            'Box', 'Corrugated', 100, 'Test'
        ),
        new Item(
            'Paper', 'Roll', 700, 'Paper Test'
        )
    ];


    getInventory() {
        return this.items.slice();
    }

    addItem(items: Item[]) {
        this.items.push(...items);
    }
    // getItems() {
    //     this.http.get('https://ng-recipe-book-fb935.firebaseio.com/recipes.json')
    //         .map(
    //         (response: Response) => {
    //             const items: Item[] = response.json();
    //             return items;
    //         }
    //         )
    //         .subscribe(
    //         (items: Item[]) => {
    //             this.inventroyList.next(this.items.slice());
    //         }
    //         );
    // }
}