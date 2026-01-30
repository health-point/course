import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="login()">
      <input formControlName="username">
      <input type="password" formControlName="password">
      <button type="submit" [disabled]="form.invalid">Войти</button>
    </form>
  `,
  standalone: true,
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private auth: AuthService, private router: Router) { }
  
  login() {
    this.auth.login(this.form.value as any).subscribe({
      next: () => this.router.navigate(['/list']),
      error: err => console.log('ошибка', err)
    });

  }
}