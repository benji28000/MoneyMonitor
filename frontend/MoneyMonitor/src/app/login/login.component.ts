import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private auth: AuthService, private router: Router) {}



  onLogin() {
    if (this.loginForm.valid) {
      if (this.loginForm.value){
        this.auth.login(<string>this.loginForm.value.email);
        this.router.navigate(['/home']).then(r => console.log('Navigated to home'));

      }
    }
  }
}
