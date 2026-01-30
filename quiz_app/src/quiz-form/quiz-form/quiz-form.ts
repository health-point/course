import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuizService } from '../../services/quiz-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h2>Создать квиз</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="Название" required>
      <input formControlName="description" placeholder="Описание">
      <button type="submit" [disabled]="form.invalid">Сохранить</button>
    </form>
  `
})
export class QuizFormComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  constructor(private quizService: QuizService, private router: Router) { }

  onSubmit() {
    if (this.form.invalid) return;

    const data = {
      name: this.form.value.name!,
      description: this.form.value.description || '',
      items: []
    };

    this.quizService.addQuiz(data).subscribe({
      next: () => this.router.navigate(['/list']),
      error: err => console.error(err)
    });
  }
}