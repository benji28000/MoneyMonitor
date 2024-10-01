import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, MatIcon],
  standalone: true
})
export class SignupComponent {
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  hidePassword: boolean = true;

  constructor(private userService: UserService) {}

  hide(): boolean {
    return this.hidePassword;
  }

  clickEvent(event: Event): void {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }


  onSubmit() {
    if (this.signupForm.valid) {
      this.userService.register(this.signupForm.value).subscribe({
        next: (response) => console.log('User registered', response),
        error: (error) => console.error('Error registering user', error)
      });
    }
  }

}
