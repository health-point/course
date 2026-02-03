import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth-service';
import { Auth } from './components/auth/auth';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    RouterLink, 
    Auth, 
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `<mat-toolbar color="primary" class="nav-toolbar">
  <div class="container">
    <a routerLink="/" class="logo">
      <mat-icon>quiz</mat-icon>
      
    </a>

    <nav class="nav-links">
      @if (authService.isAuthenticated()) {
        <a mat-button routerLink="/create">Создать квиз</a>
      }
    </nav>

    <span class="spacer"></span>

    <div class="actions">
      @if (!authService.isAuthenticated()) {
        <div class="auth-buttons-group">
          <button mat-stroked-button class="login-btn" (click)="openAuth('signin')">
            <mat-icon>login</mat-icon>
            <span>Войти</span>
          </button>
          
          <button mat-flat-button color="primary" class="signup-btn" (click)="openAuth('signup')">
            <mat-icon>person_add</mat-icon>
            <span>Регистрация</span>
          </button>
        </div>
      } 
      @else {
        <button mat-stroked-button color="warn" (click)="logout()" class="logout-btn">
          <mat-icon>logout</mat-icon>
          <span>Выйти</span>
        </button>
      }
    </div>
  </div>
</mat-toolbar>

@if (authModalOpen) {
  <app-auth [initialView]="authMode" (dismiss)="closeAuth()"></app-auth>
}

<main class="content-area">
  <router-outlet></router-outlet>
</main>`,
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected readonly title = signal('quiz');
  
  authModalOpen = false;
  authMode: 'signin' | 'signup' = 'signin';

  constructor(public authService: AuthService) {
    this.authService.refreshSession().subscribe();
  }

  openAuth(mode: 'signin' | 'signup') {
    this.authMode = mode;
    this.authModalOpen = true;
  }

  closeAuth() {
    this.authModalOpen = false;
  }

  logout() {
    this.authService.logout().subscribe();
  }
}