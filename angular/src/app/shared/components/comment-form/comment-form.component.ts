import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CommentService } from '../../../core/services/comment.service';
import { Comment } from '../../../core/models/comment.model';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class CommentFormComponent implements OnInit {
  @Input() toyId!: string;
  @Output() commentAdded = new EventEmitter<Comment>();

  commentForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private snackBar: MatSnackBar
  ) {
    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.commentForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    const comment = {
      ...this.commentForm.value,
      toyId: this.toyId,
    };

    this.commentService.addComment(comment).subscribe({
      next: (addedComment) => {
        this.commentForm.reset();
        this.isSubmitting = false;
        this.commentAdded.emit(addedComment);
        this.snackBar.open('Comentario añadido correctamente', 'Cerrar', {
          duration: 3000,
        });
      },
      error: (error) => {
        console.error('Error al añadir comentario', error);
        this.isSubmitting = false;
        this.snackBar.open('Error al añadir el comentario', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
