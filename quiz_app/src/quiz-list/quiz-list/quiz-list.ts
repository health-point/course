import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz-service';
import { Quiz } from '../../models/quiz.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quiz-list',
  imports: [],
  template: `
    <h1>Список квизов</h1>
    <p>Всего: {{ quizzes.length }}</p>

    @for (quiz of getVisibleQuizzes(); track quiz.id) {
      <div class="quiz-card">
        <h2>{{ quiz.name }}</h2>
        <p>{{ quiz.description || 'Нет описания' }}</p>
        <p>Вопросов: {{ (quiz.questions?.length ?? quiz.items?.length) || 0 }}</p>
        <button (click)="onDelete(quiz?.id || 0)">Удалить</button>
      </div>
    }
<button (click)="openCreateForm()">Добавить квиз</button>
    <div class="pagination">
      <button (click)="goToPage(currentPage - 1)" [disabled]="currentPage === 1">Предыдущая</button>

      @for (page of pagesArray(); track page) {
        <button (click)="goToPage(page)" [class.active]="currentPage === page">
          {{ page }}
        </button>
      }

      <button (click)="goToPage(currentPage + 1)" [disabled]="currentPage === maxPages">Следующая</button>
    </div>
  `,
  styleUrl: './quiz-list.scss',
})
export class QuizList implements OnInit {
  quizzes: Quiz[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  maxPages = 1;

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.loadQuizzes();
  }
  openCreateForm() {
    this.router.navigate(['/create']);
  }
  loadQuizzes() {
    this.quizService.getQuizzes().subscribe(quizzes => {
      this.quizzes = quizzes ?? [];
      this.maxPages = Math.ceil(this.quizzes.length / this.itemsPerPage) || 1;
      this.currentPage = Math.min(this.currentPage, this.maxPages);
    });
  }

  onDelete(id: number): void {
    if (id !== 0) {
      this.quizService.deleteQuiz(id).subscribe(() => this.loadQuizzes());
    }
  }

  getVisibleQuizzes(): Quiz[] {
    if (!this.quizzes?.length) return [];
    const reversed = [...this.quizzes].reverse();
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return reversed.slice(start, end);
  }

  goToPage(page: number): void {
    const max = Math.ceil(this.quizzes.length / this.itemsPerPage) || 1;
    if (page >= 1 && page <= max) {
      this.currentPage = page;
    }
  }

  pagesArray(): number[] {
    return Array.from({ length: this.maxPages }, (_, i) => i + 1);
  }
}