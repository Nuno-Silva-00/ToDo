import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service';
import { ShoppingListItem } from 'src/app/shared/models/ShoppingListItem';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  subscription!: Subscription;
  editMode = false;
  @Output() blockDelete = new EventEmitter<boolean>();
  editItemId: string | null = null;
  editedItem!: ShoppingListItem;

  shoppingListForm = new FormGroup({
    item: new FormControl(),
    amount: new FormControl(),
  });

  constructor(private shoppingListService: ShoppingListService) { }

  onSubmit() {
    const item: string = this.shoppingListForm.get('item')!.value;
    const amount: number = this.shoppingListForm.get('amount')!.value;

    if (this.editMode) {
      if (this.editItemId)
        this.shoppingListService.updateItem(this.editItemId, item.trim(), amount < 0 ? 0 : amount);
    } else {
      this.shoppingListService.addItem(item.trim(), amount < 0 ? 0 : amount);
    }

    this.resetForm();
  }

  resetForm() {
    this.shoppingListForm.reset();

    this.editMode = false;
    this.blockDelete.emit(false);
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((id: string) => {
      this.editItemId = id;
      this.editMode = true;
      this.blockDelete.emit(true);
      this.editedItem = this.shoppingListService.getItem(id);

      this.shoppingListForm.setValue({
        item: this.editedItem.item,
        amount: this.editedItem.amount
      });
    });
  }
}