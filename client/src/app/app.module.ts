import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { AuthEffects } from './store/Effects/auth.effects';
import { TodoEffects } from './store/Effects/todo.effects';

import * as fromApp from './store/Reducers/app.reducer';

import { TodoModule } from './todo/todo.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth-page/auth-page.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    SharedModule,
    TodoModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, TodoEffects])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
