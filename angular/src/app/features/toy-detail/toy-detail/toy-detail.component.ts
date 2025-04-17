import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

import { Toy } from '../../../core/models/toy.model';
import { Comment } from '../../../core/models/comment.model';
import { ToyService } from '../../../core/services/toy.service';
import { CommentService } from '../../../core/services/comment.service';
import { AuthService } from '../../../core/services/auth.service';
import { CommentFormComponent } from '../../../shared/components/comment-form/comment-form.component';
import { CommentListComponent } from '../../../shared/components/comment-list/comment-list.component';

@Component({
  selector: 'app-toy-detail',
  templateUrl: './toy-detail.component.html',
  styleUrls: ['./toy-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DatePipe,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    CommentFormComponent,
    CommentListComponent,
  ],
})
export class ToyDetailComponent implements OnInit {
  toy: Toy | undefined;
  comments: Comment[] = [];
  isLoading = true;
  isLoadingComments = true;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toyService: ToyService,
    private commentService: CommentService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadToyDetails();
  }

  loadToyDetails(): void {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.toyService.getToyById(id).subscribe({
        next: (toy) => {
          this.toy = toy;
          this.isLoading = false;
          if (toy) {
            this.loadComments(toy.id);
          }
        },
        error: (error) => {
          console.error('Error cargando detalles del juguete', error);
          this.snackBar.open(
            'Error al cargar los detalles del juguete',
            'Cerrar',
            {
              duration: 3000,
              panelClass: ['error-snackbar'],
            }
          );
          this.isLoading = false;
        },
      });
    } else {
      this.isLoading = false;
    }
  }

  loadComments(toyId: string): void {
    this.isLoadingComments = true;
    this.commentService.getCommentsByToyId(toyId).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.isLoadingComments = false;
      },
      error: (error) => {
        console.error('Error cargando comentarios', error);
        this.snackBar.open('Error al cargar los comentarios', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
        this.isLoadingComments = false;
      },
    });
  }

  onVote(): void {
    if (this.toy) {
      this.toyService.voteToy(this.toy.id).subscribe({
        next: (updatedToy) => {
          if (updatedToy) {
            this.toy = updatedToy;
            this.snackBar.open('Gracias por tu voto', 'Cerrar', {
              duration: 2000,
            });
          }
        },
        error: (error) => {
          console.error('Error al votar', error);
          this.snackBar.open('Error al registrar tu voto', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }

  onDelete(): void {
    if (
      this.toy &&
      confirm(`¿Estás seguro de que deseas eliminar "${this.toy.title}"?`)
    ) {
      this.toyService.deleteToy(this.toy.id).subscribe({
        next: (success) => {
          if (success) {
            this.snackBar.open('Juguete eliminado correctamente', 'Cerrar', {
              duration: 2000,
            });
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          console.error('Error al eliminar juguete', error);
          this.snackBar.open('Error al eliminar el juguete', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }

  onCommentAdded(comment: Comment): void {
    this.comments.unshift(comment);
  }

  onCommentDeleted(commentId: string): void {
    this.commentService.deleteComment(commentId).subscribe({
      next: (success) => {
        if (success) {
          this.comments = this.comments.filter((c) => c.id !== commentId);
          this.snackBar.open('Comentario eliminado correctamente', 'Cerrar', {
            duration: 2000,
          });
        }
      },
      error: (error) => {
        console.error('Error al eliminar comentario', error);
        this.snackBar.open('Error al eliminar el comentario', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
