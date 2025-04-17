import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Toy } from '../../../core/models/toy.model';
import { ToyService } from '../../../core/services/toy.service';
import { ToyCardComponent } from '../../../shared/components/toy-card/toy-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ToyCardComponent,
  ],
})
export class HomeComponent implements OnInit {
  toys: Toy[] = [];
  filteredToys: Toy[] = [];
  isLoading = true;
  searchTerm = '';

  constructor(private toyService: ToyService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadToys();
  }

  loadToys(): void {
    this.isLoading = true;
    this.toyService.getAllToys().subscribe({
      next: (toys) => {
        this.toys = toys;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando juguetes', error);
        this.snackBar.open('Error al cargar los juguetes', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
        this.isLoading = false;
      },
    });
  }

  applyFilter(): void {
    if (!this.searchTerm.trim()) {
      this.filteredToys = [...this.toys];
      return;
    }

    const search = this.searchTerm.toLowerCase().trim();
    this.filteredToys = this.toys.filter(
      (toy) =>
        toy.title.toLowerCase().includes(search) ||
        toy.description.toLowerCase().includes(search)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFilter();
  }

  onVote(toyId: string): void {
    this.toyService.voteToy(toyId).subscribe({
      next: (updatedToy) => {
        if (updatedToy) {
          // Actualizar el juguete en la lista local
          const index = this.toys.findIndex((t) => t.id === toyId);
          if (index !== -1) {
            this.toys[index] = updatedToy;
            this.applyFilter();
          }

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

  onDelete(toyId: string): void {
    this.toyService.deleteToy(toyId).subscribe({
      next: (success) => {
        if (success) {
          this.toys = this.toys.filter((t) => t.id !== toyId);
          this.applyFilter();

          this.snackBar.open('Juguete eliminado correctamente', 'Cerrar', {
            duration: 2000,
          });
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
