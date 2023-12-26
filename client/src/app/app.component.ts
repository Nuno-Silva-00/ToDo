import { Component } from '@angular/core';
import { AuthResponseData, AuthService } from './services/auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.autoLogin();    
  }

  private autoLogin() {
    let authObs: Observable<AuthResponseData>;

    authObs = this.authService.login("teste@teste.com", "teste@teste.com");

    authObs.subscribe({
      next: (v) => {
        this.router.navigate(['/']);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
      }
    });
  }

}
