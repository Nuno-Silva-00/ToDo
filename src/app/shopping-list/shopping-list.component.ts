import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


import { ShoppingListItem } from '../shared/models/ShoppingListItem';
import { ShoppingListService } from '../services/shoppingList/shopping-list.service';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  shoppingList: ShoppingListItem[] = [];
  private subscription!: Subscription;

  editMode = false;

  constructor(private shoppingListService: ShoppingListService, private deleteMessage: MatDialog) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.getAll()
      .subscribe((items: ShoppingListItem[]) => {
        this.shoppingList = items;
      });

    this.subscription.add(
      this.shoppingListService.shoppingListChanged.subscribe((items: ShoppingListItem[]) => {
        this.shoppingList = items;
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteToDo(id: number): void {
    const dialogRef = this.deleteMessage.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      result && this.shoppingListService.deleteItem(id);
    });
  }

  onEditToDo(id: number): void {
    this.shoppingListService.startedEditing.next(id);
  }

  onBlockDelete(block: boolean) {
    this.editMode = block;
  }
}
