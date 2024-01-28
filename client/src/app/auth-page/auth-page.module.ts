import { NgModule } from "@angular/core";
import { AuthPageComponent } from "./auth-page.component";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
    declarations: [
        AuthPageComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatSnackBarModule,
        MatIconModule,
    ]
})
export class AuthModule { }