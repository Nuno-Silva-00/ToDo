import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ShoppingListItem } from 'src/app/shared/models/ShoppingListItem';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  shoppingListChanged = new Subject<ShoppingListItem[]>();
  startedEditing = new Subject<string>();
  path = environment.API + '/api/shopping';

  constructor(private http: HttpClient) { }

  private shoppingList: ShoppingListItem[] = [];

  getItem(id: string): ShoppingListItem {
    return this.shoppingList.filter(item => item.id === id)[0] || null;
  }

  getAll() {
    return this.http.get<ShoppingListItem[]>(this.path).pipe(tap((resData: ShoppingListItem[]) => {
      this.shoppingList = resData;
    }));
  }

  addItem(item: string, amount: number): void {
    this.http.post<ShoppingListItem>(this.path + '/create', {
      item,
      amount
    }).subscribe(
      {
        next: (response) => {
          this.shoppingList.push(response);
          this.shoppingListChanged.next(this.shoppingList.slice());
        },
        error: (e) => {
          console.log('An Error occurred ', e.message);
        },
        complete: () => { console.info('Shopping List Item Created!'); }
      }
    );
  }

  deleteItem(id: string): void {
    this.http.delete(this.path + '/delete/' + id).subscribe(
      {
        next: (response) => {
          const index = this.shoppingList.findIndex(item => item.id === id);
          this.shoppingList.splice(index, 1);
          this.shoppingListChanged.next(this.shoppingList.slice());
        },
        error: (e) => {
          console.log('An Error occurred ', e.message);
        },
        complete: () => { console.info('To Do Deleted'); }
      }
    );

  }

  updateItem(id: string, item: string, amount: number,) {
    this.http.patch(this.path + '/update', { id, item, amount }).subscribe(
      {
        next: (response) => {
          const Index = this.shoppingList.findIndex(item => item.id === id);
          this.shoppingList[Index] = { id: this.shoppingList[Index].id, item, amount };
          this.shoppingListChanged.next(this.shoppingList.slice());
        },
        error: (e) => {
          console.log('An Error occurred ', e.message);
        },
        complete: () => { console.info('To Do Updated'); }
      }
    );
  }
}
