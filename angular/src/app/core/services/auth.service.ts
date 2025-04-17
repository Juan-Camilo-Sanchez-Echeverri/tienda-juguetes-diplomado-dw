import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  // Simulamos el token JWT
  private tokenKey = 'auth_token';

  // Usuario de prueba (en una aplicación real, estos datos estarían en un backend)
  private adminUser = {
    email: 'admin@example.com',
    password: 'password123',
  };

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    let storedUser = null;

    if (isPlatformBrowser(this.platformId)) {
      storedUser = localStorage.getItem('currentUser');
    }

    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<AuthResponse> {
    // En una aplicación real, esta lógica estaría en el backend
    if (
      email === this.adminUser.email &&
      password === this.adminUser.password
    ) {
      const user: User = {
        id: '1',
        email: email,
        name: 'Administrador',
        role: 'admin',
      };

      // Simulamos un token JWT
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNTE2MjQyNjIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;

      const authResponse: AuthResponse = {
        user: user,
        token: token,
        expiresIn: 3600, // 1 hora
      };

      // Guardamos el usuario y el token en el localStorage solo si estamos en el navegador
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem(this.tokenKey, token);
      }

      this.currentUserSubject.next(user);
      return of(authResponse);
    }

    return throwError(() => new Error('Credenciales incorrectas'));
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem(this.tokenKey);
    }
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }
}
