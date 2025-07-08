import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}
    loggedIn = signal<boolean>(false);

    readonly isLoggedIn = this.loggedIn.asReadonly();

    login() {
      this.loggedIn.set(true);
    }

    logout() {
      this.loggedIn.set(false);
    }

}
