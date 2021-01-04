import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser, USER_ROLE } from '../models/IUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  login(username: string, password: string) {
    return this.http.post('/auth/login', { username, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('access_token', res.token);
      })
    );
  }

  register(user: IUser): Observable<IUser> {
    return this.http.post('/api/users', user).pipe(
      map((u: any) => {
        return {
          name: u.name,
          lastname: u.lastname,
          username: u.username,
          password: u.password,
          role: u.role,
          id: u._id,
        };
      })
    );
  }

  public get isLogged(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  //TODO: esto deberia venir con el user
  public get userPermissions(): string[] {
    const ADMIN_PERMISSIONS = ['MANAGE_MEETUPS'];
    const USER_PERMISSIONS = ['ATTEND_MEETUPS'];
    if (this.user && this.user.role == USER_ROLE.ADMIN) {
      return ADMIN_PERMISSIONS;
    } else if (this.user && this.user.role == USER_ROLE.USER) {
      return USER_PERMISSIONS;
    } else {
      return [];
    }
  }

  public get user(): IUser {
    // get token from local storage or state management
    const token = localStorage.getItem('access_token');

    // decode token to read the payload details
    const user: IUser = this.jwtHelperService.decodeToken(token);
    return user;
  }

  public get userRole(): USER_ROLE {
    // get token from local storage or state management
    const token = localStorage.getItem('access_token');

    // decode token to read the payload details
    const user: IUser = this.jwtHelperService.decodeToken(token);
    return user.role;
  }

  isAuthorized(allowedRoles: string[]): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }

    // get token from local storage or state management
    const token = localStorage.getItem('access_token');

    // decode token to read the payload details
    const user: IUser = this.jwtHelperService.decodeToken(token);

    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!user) {
      console.log('Invalid token');
      return false;
    }

    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    // Pasar enumeraritivo de roles a string y comparar el iinclude

    let userRole: USER_ROLE = user.role;

    // TODO: a futuro podriamos extraer todos los permisos de todos los roles, y luego
    // autorizamos solo si tiene el permiso que necesita
    let allowed = allowedRoles.includes(userRole);
    return allowed;
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
