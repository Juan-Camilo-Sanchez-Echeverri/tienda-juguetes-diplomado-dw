import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ToyService } from '../../../core/services/toy.service';

@Component({
  selector: 'app-toy-form',
  templateUrl: './toy-form.component.html',
  styleUrl: './toy-form.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class ToyFormComponent implements OnInit {
  toyForm: FormGroup;
  isLoading = false;
  isEdit = false;
  toyId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private toyService: ToyService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.toyForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.toyId = this.route.snapshot.paramMap.get('id');
    if (this.toyId) {
      this.isEdit = true;
      this.loadToyDetails(this.toyId);
    }
  }

  loadToyDetails(id: string): void {
    this.isLoading = true;
    this.toyService.getToyById(id).subscribe({
      next: (toy) => {
        if (toy) {
          this.toyForm.patchValue({
            title: toy.title,
            description: toy.description,
            imageUrl: toy.imageUrl,
          });
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading toy details', error);
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
  }

  onSubmit(): void {
    if (this.toyForm.invalid) {
      return;
    }

    this.isLoading = true;
    const toyData = this.toyForm.value;

    if (this.isEdit && this.toyId) {
      this.toyService.updateToy(this.toyId, toyData).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open('Juguete actualizado correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error updating toy', error);
          this.snackBar.open('Error al actualizar el juguete', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    } else {
      this.toyService.createToy(toyData).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open('Juguete creado correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error creating toy', error);
          this.snackBar.open('Error al crear el juguete', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }
}
