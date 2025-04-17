import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Toy } from '../models/toy.model';

@Injectable({
  providedIn: 'root'
})
export class ToyService {
  private toys: Toy[] = [
    {
      id: '1',
      title: 'Robot Interactivo',
      description: 'Este robot interactivo es capaz de seguir comandos de voz, bailar y contar historias. Perfecto para niños que quieren aprender sobre tecnología mientras se divierten.',
      imageUrl: 'https://compraloencasa.com/cdn/shop/files/5_18409f0c-38ba-4205-acd4-b4e2dda7e775.jpg?v=1719432349&width=1445',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      votes: 42
    },
    {
      id: '2',
      title: 'Carro de Control Remoto',
      description: 'Carro todoterreno de alta velocidad con control remoto de largo alcance. Resistente a impactos y con batería de larga duración para horas de diversión.',
      imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=640&auto=format&fit=crop',
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date('2024-02-20'),
      votes: 38
    },
    {
      id: '3',
      title: 'Muñeca Educativa',
      description: 'Esta muñeca educativa ayuda a los niños a aprender sobre diferentes profesiones. Viene con accesorios intercambiables y frases motivadoras sobre cada carrera.',
      imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=640&auto=format&fit=crop',
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-03-10'),
      votes: 29
    },
    {
      id: '4',
      title: 'Set de Construcción Magnético',
      description: 'Set de construcción con piezas magnéticas que permiten crear innumerables estructuras. Fomenta la creatividad y el pensamiento espacial en niños de todas las edades.',
      imageUrl: 'https://images.unsplash.com/photo-1516981879613-9f5da904015f?q=80&w=640&auto=format&fit=crop',
      createdAt: new Date('2024-03-25'),
      updatedAt: new Date('2024-03-25'),
      votes: 51
    },
    {
      id: '5',
      title: 'Drone para Principiantes',
      description: 'Drone fácil de controlar con cámara HD integrada. Incluye funciones de estabilización automática y retorno a casa con un solo botón.',
      imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=640&auto=format&fit=crop',
      createdAt: new Date('2024-04-05'),
      updatedAt: new Date('2024-04-05'),
      votes: 34
    },
    {
      id: '6',
      title: 'Juego de Mesa Educativo',
      description: 'Juego de mesa que combina diversión y aprendizaje, enseñando a los niños sobre geografía, historia y ciencias mientras compiten por llegar a la meta.',
      imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=640&auto=format&fit=crop',
      createdAt: new Date('2024-04-15'),
      updatedAt: new Date('2024-04-15'),
      votes: 27
    }
  ];

  constructor() { }

  getAllToys(): Observable<Toy[]> {
    return of(this.toys);
  }

  getToyById(id: string): Observable<Toy | undefined> {
    const toy = this.toys.find(t => t.id === id);
    return of(toy);
  }

  createToy(toy: Omit<Toy, 'id' | 'createdAt' | 'updatedAt'>): Observable<Toy> {
    const newToy: Toy = {
      ...toy,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      votes: 0
    };

    this.toys.push(newToy);
    return of(newToy);
  }

  updateToy(id: string, toy: Partial<Toy>): Observable<Toy | undefined> {
    const index = this.toys.findIndex(t => t.id === id);
    if (index !== -1) {
      this.toys[index] = {
        ...this.toys[index],
        ...toy,
        updatedAt: new Date()
      };
      return of(this.toys[index]);
    }
    return of(undefined);
  }

  deleteToy(id: string): Observable<boolean> {
    const initialLength = this.toys.length;
    this.toys = this.toys.filter(t => t.id !== id);
    return of(initialLength !== this.toys.length);
  }

  voteToy(id: string): Observable<Toy | undefined> {
    const index = this.toys.findIndex(t => t.id === id);
    if (index !== -1) {
      this.toys[index] = {
        ...this.toys[index],
        votes: (this.toys[index].votes || 0) + 1
      };
      return of(this.toys[index]);
    }
    return of(undefined);
  }
}
