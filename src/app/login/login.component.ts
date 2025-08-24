import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  loginStatus: boolean | null = null;

  constructor(private apiService: ApiService, public authService: AuthService) {}

 login(): void {
   const data = {
    username: this.username, 
    password: this.password
   }

   this.apiService.login(data).subscribe({
    next: (response) => {
       if (response.status === 200) {
        this.authService.login();
        this.loginStatus = true;
    }  else {
        this.loginStatus = false;
    }
   },
    error: (error) => {
        this.loginStatus = false;
        console.log(error);
    }
   })

}


logout(): void {
  this.authService.logout();
  this.loginStatus = null;
}

}