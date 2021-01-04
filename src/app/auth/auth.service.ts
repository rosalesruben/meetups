import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser, USER_ROLE } from '../models/IUser';

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

  public get isLogged(): boolean {
    return localStorage.getItem('access_token') !== null;
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
