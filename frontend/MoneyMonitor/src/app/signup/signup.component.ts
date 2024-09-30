import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule, HttpClientModule], // Assurez-vous que c'est bien ici
  standalone: true
})
export class SignupComponent {
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private userService: UserService) {}

  onSubmit() {
    if (this.signupForm.valid) {
      this.userService.register(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('User registered', response);

        },
        error: (error) => {
          console.error('Error registering user', error);
        }
      });
    }
  }
}
