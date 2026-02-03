import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { finalize, mergeMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
type ViewMode = 'signin' | 'signup';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule,MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  template: `<div class="auth-overlay" (click)="dismissModal()">
  <mat-card class="auth-card" (click)="$event.stopPropagation()">
    <button mat-icon-button class="close-btn" (click)="dismissModal()">
      <mat-icon>close</mat-icon>
    </button>

    <div class="auth-header">
      <h2 class="auth-title">{{ currentView === 'signin' ? 'Авторизация' : 'Регистрация' }}</h2>
      <p class="auth-subtitle">{{ currentView === 'signin' ? 'Войдите в свою аккаунт' : 'Создайте новый аккаунт' }}</p>
    </div>

    <nav mat-tab-nav-bar [tabPanel]="tabPanel" class="auth-tabs">
      <a mat-tab-link (click)="toggleView('signin')" [active]="currentView === 'signin'"> Вход </a>
      <a mat-tab-link (click)="toggleView('signup')" [active]="currentView === 'signup'"> Регистрация </a>
    </nav>

    <mat-tab-nav-panel #tabPanel>
      <div class="form-container">
        @if (message) {
          <div class="auth-error-message">
            <mat-icon>error_outline</mat-icon>
            <span>{{ message }}</span>
          </div>
        }

        <form (ngSubmit)="onSubmit()" class="auth-form">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Логин</mat-label>
            <mat-icon matPrefix>person_outline</mat-icon>
            <input
              matInput
              type="text"
              [(ngModel)]="login"
              name="login"
              required
              autocomplete="username"
            />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Пароль</mat-label>
            <mat-icon matPrefix>lock_open</mat-icon>
            <input
              matInput
              type="password"
              [(ngModel)]="pass"
              name="pass"
              required
              [autocomplete]="currentView === 'signin' ? 'current-password' : 'new-password'"
            />
          </mat-form-field>

          <button mat-flat-button color="primary" type="submit" class="submit-btn" [disabled]="processing">
            {{ processing ? 'Загрузка...' : (currentView === 'signin' ? 'Войти' : 'Создать аккаунт') }}
          </button>
        </form>
      </div>
    </mat-tab-nav-panel>
  </mat-card>
</div>`,
  styleUrl: './auth.scss'
})
export class Auth {
  @Input() initialView: ViewMode = 'signin';
  @Output() dismiss = new EventEmitter<void>();

  login = '';
  pass = '';
  message: string | null = null;
  processing = false;

  currentView: ViewMode = this.initialView;

  constructor(private auth: AuthService) { }

  toggleView(to: ViewMode) {
    this.currentView = to;
    this.message = null;
  }

  dismissModal() {
    this.dismiss.emit();
  }

  onSubmit() {
    const u = this.login.trim();
    const p = this.pass.trim();

    if (!u || !p) {
      this.message = 'Заполните поля логина и пароля';
      return;
    }

    this.processing = true;
    this.message = null;

    const action = this.currentView === 'signin'
      ? this.auth.login(u, p)
      : this.auth.register(u, p).pipe(mergeMap(() => this.auth.login(u, p)));

    action
      .pipe(finalize(() => this.processing = false))
      .subscribe({
        next: () => this.dismissModal(),
        error: () => {
          this.message = this.currentView === 'signin'
            ? 'неверные данные'
            : 'ошибка при регистрации';
        }
      });
  }
}