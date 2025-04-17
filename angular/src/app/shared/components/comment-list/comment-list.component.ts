import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Comment } from '../../../core/models/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class CommentListComponent implements OnInit {
  @Input() comments: Comment[] = [];
  @Input() isLoading = false;
  @Input() isAdmin = false;
  @Output() commentDeleted = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onDelete(commentId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
      this.commentDeleted.emit(commentId);
    }
  }
}
