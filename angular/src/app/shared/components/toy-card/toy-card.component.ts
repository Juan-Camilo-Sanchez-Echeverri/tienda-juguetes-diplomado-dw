import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe, SlicePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Toy } from '../../../core/models/toy.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-toy-card',
  templateUrl: './toy-card.component.html',
  styleUrls: ['./toy-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DatePipe,
    SlicePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ToyCardComponent implements OnInit {
  @Input() toy!: Toy;
  @Output() vote = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  isAdmin = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  onVote(): void {
    this.vote.emit(this.toy.id);
  }

  onDelete(): void {
    if (confirm(`¿Estás seguro de que deseas eliminar "${this.toy.title}"?`)) {
      this.delete.emit(this.toy.id);
    }
  }
}
