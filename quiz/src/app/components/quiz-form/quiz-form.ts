import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz-service';
import { AuthService } from '../../services/auth-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

type QuestionFormSelect = { type: 'select'; title: string; description: string; options: string[] };
type QuestionFormText = { type: 'text'; title: string; description: string; placeholder: string };
type QuestionForm = QuestionFormSelect | QuestionFormText;

@Component({
  selector: 'app-quiz-form',
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatIconModule,MatDividerModule,MatTooltipModule],
  template: `
  @if (!isAuthenticated()) {
<div class="unauth-container">
  <mat-icon class="lock-icon">lock_open</mat-icon>
  <p>Сначала войдите, чтобы создать свой первый потрясающий квиз.</p>
</div>
} @else {
<div class="quiz-form-page">
  <div class="quiz-form-card">
    <header class="form-header">
      <h2>Создать квиз</h2>
      @if (formError) {
      <div class="error-message">
        <mat-icon>error_outline</mat-icon> {{ formError }}
      </div>
      }
    </header>

    <section class="form-section">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Название квиза</mat-label>
        <input matInput [(ngModel)]="quizTitle" name="name" placeholder="Например: основы angular">
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Описание</mat-label>
        <textarea matInput [(ngModel)]="quizDesc" name="description" rows="3" placeholder="Напишите, о чем этот тест"></textarea>
      </mat-form-field>
    </section>

    <mat-divider></mat-divider>

    <div class="questions-container">
      <div class="questions-header">
        <h3>Вопросы</h3>
        <div class="add-actions">
          <button mat-stroked-button color="primary" (click)="addQuestion('select')">
            <mat-icon>list</mat-icon> С выбором ответа
          </button>
          <button mat-stroked-button color="primary" (click)="addQuestion('text')">
            <mat-icon>short_text</mat-icon> Текстовый
          </button>
        </div>
      </div>

      @for (question of quizQuestions; track $index; let questionIndex = $index) {
      <div class="question-card">
        <div class="question-card-header">
          <span class="q-number">Вопрос {{ questionIndex + 1 }}</span>
          <span class="q-type-badge">{{ question.type === 'select' ? 'Выбор варианта' : 'Текстовый ответ' }}</span>
          <div class="spacer"></div>
          @if (quizQuestions.length > 1) {
          <button mat-icon-button color="warn" (click)="removeQuestion(questionIndex)" matTooltip="Удалить вопрос">
            <mat-icon>delete_outline</mat-icon>
          </button>
          }
        </div>

        <div class="question-body">
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Название вопроса</mat-label>
            <input matInput [(ngModel)]="question.title" [name]="'title-' + questionIndex">
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Описание вопроса (необязательно)</mat-label>
            <input matInput [(ngModel)]="question.description" [name]="'description-' + questionIndex">
          </mat-form-field>

          @if (question.type === 'select') {
          <div class="options-list">
            @for (option of question.options; track $index; let optionIndex = $index) {
            <div class="option-row">
              <mat-icon class="drag-handle">drag_indicator</mat-icon>
              <mat-form-field appearance="fill" class="option-input">
                <input matInput [(ngModel)]="question.options[optionIndex]" [name]="'opt-'+questionIndex+'-'+optionIndex" placeholder="Вариант {{optionIndex + 1}}">
              </mat-form-field>
              @if (question.options.length > 2) {
              <button mat-icon-button (click)="removeOption(questionIndex, optionIndex)">
                <mat-icon>close</mat-icon>
              </button>
              }
            </div>
            }
            <button mat-button color="primary" (click)="addOption(questionIndex)" class="add-opt-btn">
              <mat-icon>add</mat-icon> Добавить вариант
            </button>
          </div>
          } @else {
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Подсказка в поле ввода</mat-label>
            <input matInput [(ngModel)]="question.placeholder" [name]="'placeholder-' + questionIndex">
          </mat-form-field>
          }
        </div>
      </div>
      }
    </div>

    <div class="form-footer">
      <button mat-flat-button color="primary" class="submit-btn" (click)="submit()" [disabled]="submitting">
        <mat-icon>check</mat-icon> Создать квиз
      </button>
    </div>
  </div>
</div>
}`,
  styleUrl: './quiz-form.scss',
  standalone: true,
})

export class QuizForm {
  quizTitle = '';
  quizDesc = '';
  quizQuestions: QuestionForm[] = [];
  formError: string | null = null;
  submitting = false;

  constructor(
    private quizService: QuizService,
    private authService: AuthService,
    private router: Router
  ) { }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  addQuestion(type: 'select' | 'text') {
    if (type === 'select') {
      this.quizQuestions.push({ type: 'select', title: '', description: '', options: ['', ''] });
    } else {
      this.quizQuestions.push({ type: 'text', title: '', description: '', placeholder: '' });
    }
  }

  removeQuestion(index: number) {
    this.quizQuestions.splice(index, 1);
  }

  addOption(questionIndex: number) {
    const q = this.quizQuestions[questionIndex];
    if (q.type === 'select') {
      q.options.push('');
    }
  }

  removeOption(questionIndex: number, optionIndex: number) {
    const q = this.quizQuestions[questionIndex];
    if (q.type === 'select' && q.options.length > 2) {
      q.options.splice(optionIndex, 1);
    }
  }

  submit() {
    if (!this.isAuthenticated()) {
      this.formError = 'Сначала войдите в аккаунт.';
      return;
    }
    const name = this.quizTitle.trim();
    const description = this.quizDesc.trim();

    if (!name || !description) {
      this.formError = 'Заполните название и описание.';
      return;
    }

    if (this.quizQuestions.length === 0) {
      this.formError = 'Добавьте хотя бы один вопрос.';
      return;
    }

    const preparedItems: (
      | { type: 'select'; title: string; description: string; options: string[] }
      | { type: 'text'; title: string; description: string; placeholder: string }
    )[] = [];

    for (const question of this.quizQuestions) {
      const title = question.title.trim();
      const description = question.description.trim();
      if (!title) {
        this.formError = 'У каждого вопроса заполните название.';
        return;
      }
      if (question.type === 'select') {
        const options = question.options.map((o) => o.trim()).filter(Boolean);
        if (options.length < 2) {
          this.formError = 'В вопросе с выбором варианта должно быть минимум 2 варианта.';
          return;
        }
        preparedItems.push({ type: 'select', title, description, options });
      } else {
        const placeholder = question.placeholder.trim();
        if (!placeholder) {
          this.formError = 'У текстового вопроса заполните placeholder.';
          return;
        }
        preparedItems.push({ type: 'text', title, description, placeholder });
      }
    }

    this.submitting = true;
    this.formError = null;

    this.quizService.createQuiz(name, description, preparedItems).subscribe((success: boolean) => {
      this.submitting = false;
      if (success) {
        this.router.navigateByUrl('/');
      } else {
        this.formError = 'Не удалось создать квиз..';
      }
    });
  }
}

