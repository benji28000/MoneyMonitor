import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!window.localStorage.getItem('user');
    }
    return false;
  }

  login(email: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('user', email);
    }
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem('user');
      this.router.navigate(['/login']).then(r => console.log('Navigated to login'));
    }
  }

}
