import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: Comment[] = [
    {
      id: '1',
      toyId: '1',
      name: 'Laura García',
      email: 'laura@example.com',
      message: 'Mi hijo tiene este robot y le encanta. Es muy intuitivo de usar y realmente capta su atención durante horas.',
      createdAt: new Date('2024-02-10')
    },
    {
      id: '2',
      toyId: '1',
      name: 'Carlos Rodríguez',
      email: 'carlos@example.com',
      message: '¿Alguien sabe si este robot es compatible con dispositivos iOS? Me gustaría comprarlo pero quiero asegurarme primero.',
      createdAt: new Date('2024-02-15')
    },
    {
      id: '3',
      toyId: '2',
      name: 'Ana Martínez',
      email: 'ana@example.com',
      message: 'Este carro es genial. La batería dura muchísimo y el control remoto tiene un alcance impresionante.',
      createdAt: new Date('2024-03-05')
    },
    {
      id: '4',
      toyId: '3',
      name: 'Pedro López',
      email: 'pedro@example.com',
      message: 'Mi hija está encantada con esta muñeca. Le encanta jugar a ser doctora y la muñeca la ha motivado mucho.',
      createdAt: new Date('2024-03-20')
    },
    {
      id: '5',
      toyId: '4',
      name: 'Elena Sánchez',
      email: 'elena@example.com',
      message: 'Las piezas magnéticas son perfectas para mis hijos. No se pierden tan fácilmente como otros juguetes y pueden construir estructuras muy creativas.',
      createdAt: new Date('2024-04-02')
    }
  ];

  constructor() { }

  getCommentsByToyId(toyId: string): Observable<Comment[]> {
    return of(this.comments.filter(c => c.toyId === toyId));
  }

  addComment(comment: Omit<Comment, 'id' | 'createdAt'>): Observable<Comment> {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    this.comments.push(newComment);
    return of(newComment);
  }

  deleteComment(id: string): Observable<boolean> {
    const initialLength = this.comments.length;
    this.comments = this.comments.filter(c => c.id !== id);
    return of(initialLength !== this.comments.length);
  }
}
