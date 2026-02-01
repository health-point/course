import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

      <h3>Вопросы</h3>
      <button type="button" (click)="addItem('Choice')">Добавить выбор</button>
      <button type="button" (click)="addItem('Range')">Добавить диапазон</button>
      <button type="button" (click)="addItem('Text')">Добавить текст</button>

      <div formArrayName="items">
        @for (item of items.controls; track $index; let idx = $index) {
          <div [formGroupName]="idx">
            <input formControlName="title" placeholder="Заголовок вопроса" required>
            <input formControlName="description" placeholder="Описание вопроса">

            @if (item.get('options')) {
              <div formArrayName="options">
                @for (option of getOptions(idx).controls; track $index; let optIdx = $index) {
                  <input [formControlName]="optIdx" placeholder="Опция">
                }
                <button type="button" (click)="addOption(idx)">Добавить опцию</button>
              </div>
            } @else if (item.get('min')) {
              <input formControlName="min" type="number" placeholder="Мин" required>
              <input formControlName="max" type="number" placeholder="Макс" required>
            } @else if (item.get('placeholder')) {
              <input formControlName="placeholder" placeholder="Placeholder">
            }

            <button type="button" (click)="removeItem(idx)">Удалить вопрос</button>
          </div>
        }
      </div>

      <button type="submit" [disabled]="form.invalid">Сохранить</button>
    </form>
  `
})
export class QuizFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: QuizService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      items: this.fb.array([])
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  getOptions(index: number): FormArray {
    return this.items.at(index).get('options') as FormArray;
  }

  addItem(type: 'Choice' | 'Range' | 'Text') {
    let group: FormGroup;
    if (type === 'Choice') {
      group = this.fb.group({
        title: ['', Validators.required],
        description: [''],
        options: this.fb.array([this.fb.control('', Validators.required)], Validators.minLength(1))
      });
    } else if (type === 'Range') {
      group = this.fb.group({
        title: ['', Validators.required],
        description: [''],
        min: [0, [Validators.required, Validators.min(0)]],
        max: [10, [Validators.required, Validators.min(1)]]
      });
    } else {
      group = this.fb.group({
        title: ['', Validators.required],
        description: [''],
        placeholder: ['']
      });
    }
    this.items.push(group);
  }

  addOption(index: number) {
    this.getOptions(index).push(this.fb.control('', Validators.required));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onSubmit() {
    const payload = {
      name: this.form.value.name,
      description: this.form.value.description || '',
      items: this.form.value.items.map((item: any) => {
        const base = {
          title: item.title,
          description: item.description || ''
        };
        if (item.options) return { ... base, type: 'select'};
        if (item.min !== undefined) return { ...base, min: item.min, max: item.max };
        return { ...base, placeholder: item.placeholder || '' };
      })
    };

    this.service.addQuiz(payload).subscribe({
      next: () => this.router.navigate(['/list']),
      error: err => console.error(err.error?.errors || err.message)
    });
  }
}