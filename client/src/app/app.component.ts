import { Component } from '@angular/core';
import { AuthResponseData, AuthService } from './services/auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
    if (environment.production) {
      this.authService.autoLogin();
    } else {

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
}
