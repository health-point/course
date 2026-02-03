import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz-service';
import { AuthService } from '../../services/auth-service';
import { QuizModel } from '../../model/quiz-model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [FormsModule, MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule],
  template: `@if (!auth.isAuthenticated()) {
  <div class="unauth-container">
    <mat-icon>lock_outline</mat-icon>
    <p>Войдите, чтобы увидеть список квизов.</p>
  </div>
} @else {
  @if (quizService.errorMsg()) {
    <div class="error-banner">{{ quizService.errorMsg() }}</div>
  }

  @if (quizService.loading()) {
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
  }

  <div class="quiz-list">
    @for (item of quizService.quizzes(); track item.id) {
      <mat-card class="quiz-horizontal-card">
        <div class="card-inner-content">
          <div class="quiz-main-info">
            <mat-card-title>{{ item.title }}</mat-card-title>
            <mat-card-subtitle>{{ item.description }}</mat-card-subtitle>
            
            <div class="quiz-meta">
              <mat-icon>format_list_bulleted</mat-icon>
              <span>Вопросов: {{ item.items.length }}</span>
            </div>
          </div>

          <div class="quiz-list-actions">
            <button mat-flat-button color="primary" (click)="startQuiz(item)">
              Открыть квиз
            </button>
          </div>
        </div>
      </mat-card>
    } @empty {
      <div class="empty-state">
        <p>Квизы пока не найдены.</p>
      </div>
    }
  </div>

  @if (showSuccess) {
    <div class="quiz-thank-you">
      <mat-icon>check_circle</mat-icon> Все квизы пройдены 
    </div>
  }

  <div class="paginations-control">
    <button mat-stroked-button (click)="quizService.goPrev()" [disabled]="quizService.page() === 1">
      Назад
    </button>
    <span class="page-info">Страница {{ quizService.page() }} из {{ quizService.totalPages() }}</span>
    <button mat-stroked-button (click)="quizService.goNext()" [disabled]="quizService.page() === quizService.totalPages()">
      Вперед
    </button>
  </div>

  @if (currentQuiz) {
    <div class="quiz-backdrop" (click)="close()"></div>
    <div class="quiz-modal">
      <div class="quiz-modal__header">
        <div class="header-main">
          <h3>{{ currentQuiz.title }}</h3>
          <p>{{ currentQuiz.description }}</p>
        </div>
        <button mat-icon-button (click)="close()"><mat-icon>close</mat-icon></button>
      </div>

      <div class="quiz-progress">
        <div class="quiz-progress__info">
          <span>Прогресс выполнения всех квизов</span>
          <span>{{ currentQuizPosition + 1 }} / {{ quizService.quizzes().length }}</span>
        </div>
        <mat-progress-bar mode="determinate" [value]="progress"></mat-progress-bar>
      </div>

      <div class="quiz-items">
        @for (question of currentQuiz.items; track question.id; let questionIndex = $index) {
          <div class="quiz-item">
            <p class="quiz-item__title">Вопрос {{ questionIndex + 1 }}</p>
            
            @if (question.type === 'select') {
              <div class="quiz-options">
                @for (option of question.options; track option) {
                  <button mat-button class="quiz-option-button"
                    [class.quiz-option-button--selected]="isPicked(currentQuiz.id, question.id, option)"
                    (click)="onSelect(currentQuiz, question.id, option)">
                    {{ option }}
                  </button>
                }
              </div>
            } @else {
              <mat-form-field appearance="outline" class="full-width">
                <input matInput 
                  [ngModel]="getInputValue(currentQuiz.id, question.id)"
                  (ngModelChange)="updateInput(currentQuiz.id, question.id, $event)" 
                  [placeholder]="question.placeholder">
              </mat-form-field>
            }
          </div>
        }
      </div>

      <div class="quiz-modal__footer">
        <button mat-flat-button color="accent" 
          [disabled]="!allAnswered(currentQuiz)"
          (click)="tryNext(currentQuiz)">
          Далее
        </button>
      </div>
    </div>
  }
}`,
  styleUrl: './quiz.scss'
})
export class QuizComponent {
  quizService = inject(QuizService);
  auth = inject(AuthService);
  answers: Record<string, string> = {};
  currentQuiz: QuizModel | null = null;
  showSuccess = false;

  constructor() {
    effect(() => {
      this.auth.isAuthenticated() && this.quizService.fetchQuizzes();
    });
  }

  makeKey(quizId: number, questionId: number) {
    return `${quizId}-${questionId}`;
  }

  groupName(quizId: number, questionId: number) {
    return `q-${quizId}-${questionId}`;
  }

  startQuiz(quiz: QuizModel) {
    this.currentQuiz = quiz;
    this.showSuccess = false;
  }

  close() {
    this.currentQuiz = null;
  }

  pick(quizId: number, qId: number, value: string) {
    this.answers[this.makeKey(quizId, qId)] = value;
  }

  isPicked(quizId: number, qId: number, value: string) {
    return this.answers[this.makeKey(quizId, qId)] === value;
  }

  getInputValue(quizId: number, qId: number) {
    return this.answers[this.makeKey(quizId, qId)] || '';
  }

  updateInput(quizId: number, qId: number, val: string) {
    this.answers[this.makeKey(quizId, qId)] = val;
  }

  onSelect(quiz: QuizModel, questionId: number, val: string) {
    this.pick(quiz.id, questionId, val);
    this.tryNext(quiz);
  }

  allAnswered(qz: QuizModel) {
    return qz.items.every(it => !!this.answers[this.makeKey(qz.id, it.id)]);
  }

  tryNext(current: QuizModel) {
    if (!this.currentQuiz || !this.allAnswered(current)) return;

    const list = this.quizService.quizzes();
    const idx = list.findIndex(q => q.id === current.id);
    const next = idx >= 0 ? list[idx + 1] : null;

    if (next) {
      this.startQuiz(next);
    } else {
      this.close();
      this.showSuccess = true;
    }
  }

  get currentQuizPosition() {
    if (!this.currentQuiz) return -1;
    return this.quizService.quizzes().findIndex(q => q.id === this.currentQuiz!.id);
  }

  get progress() {
    if (!this.currentQuiz) return 0;
    const pos = this.currentQuizPosition;
    const total = this.quizService.quizzes().length;
    return total > 0 ? Math.round(((pos + 1) / total) * 100) : 0;
  }
}