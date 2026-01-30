import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="register()">
      <input formControlName="username" placeholder="Username" required>
      <input type="password" formControlName="password" placeholder="Password" required>
      <button type="submit" [disabled]="form.invalid">Зарегистрироваться</button>
    </form>
  `
})
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private auth: AuthService) {}

  register() {
    this.auth.register(this.form.value as any).subscribe({
      next: () => console.log('Зарегистрирован'),
      error: err => console.error('Ошибка', err)
    });
  }
}