import { NgModule } from "@angular/core";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent
    ],
    imports: [
        SharedModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        ShoppingListRoutingModule
    ]
})
export class ShoppingListModule { }