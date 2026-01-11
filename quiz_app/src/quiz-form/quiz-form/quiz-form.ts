import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { JsonPipe, NgIf } from '@angular/common';
import { QuizService } from '../../services/quiz-service';

@Component({
  selector: 'app-quiz-form',
  imports: [ReactiveFormsModule, JsonPipe, NgIf],
  template: `
<form [formGroup]="quizForm">
  <h2>Создать новый квиз</h2>

  <div>
    <label>Название:</label>
    <div *ngIf="quizForm.get('name')?.invalid && quizForm.get('name')?.touched" style="color: red">
  Название обязательно!
</div>
    <input type="text" formControlName="name">
  </div>

  <div>
    <label>Описание:</label>
    <textarea formControlName="description"></textarea>
  </div>

  <button (click)="onSubmit()" type="submit">Сохранить</button>
</form>
`,
  styleUrl: './quiz-form.scss',
})
export class QuizForm implements OnInit {


  constructor(private quizService: QuizService) { }


  quizForm!: FormGroup;

  ngOnInit(): void {
    this.quizForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('')
    })
    console.log(this.quizForm.value);
  }


  onSubmit() {
    if (this.quizForm.invalid) {
      console.log("form invalid")
      this.quizForm.markAllAsTouched();
    }
    const newQuizData = this.quizForm.value;

    this.quizService.addQuiz (newQuizData).subscribe(quiz=>{
      console.log("mew quiz ", quiz);
      this.quizForm.reset();
    })
  }

}
