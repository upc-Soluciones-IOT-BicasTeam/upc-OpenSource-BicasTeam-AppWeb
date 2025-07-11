import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserEntity } from '../../iam/model/user.entity';
import { IamApiService } from '../../iam/services/iam-api.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserEntity | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private iamApiService: IamApiService) {
    const storedUser = this.getStoredUser();
    if (storedUser) {
      this.currentUserSubject.next(storedUser);
    }
  }

  login(email: string, password: string): Observable<UserEntity> {
    return this.iamApiService.authenticateUser(email, password).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  logout(): void {
    this.clearUserSession();
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): UserEntity | null {
    return this.currentUserSubject.value;
  }

  getCurrentUserId(): number | null {
    const user = this.getCurrentUser();
    return user ? user.id : null;
  }

  getCurrentUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  hasRole(role: string): boolean {
    const userRole = this.getCurrentUserRole();
    return userRole === role;
  }

  isManager(): boolean {
    return this.hasRole('manager');
  }

  isStaff(): boolean {
    return this.hasRole('staff');
  }

  private setCurrentUser(user: UserEntity): void {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private getStoredUser(): UserEntity | null {
    const userStr = sessionStorage.getItem('currentUser');
    if (userStr) {
      try {
        return JSON.parse(userStr) as UserEntity;
      } catch (error) {
        console.error('Error parsing stored user:', error);
        this.clearUserSession();
      }
    }
    return null;
  }

  private clearUserSession(): void {
    sessionStorage.removeItem('currentUser');
  }
}
