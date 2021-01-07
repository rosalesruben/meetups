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

  public get isLogged(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
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

  isAuthorized(permissionNeeded: string): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (permissionNeeded == null || permissionNeeded.length === 0) {
      return true;
    }

    let allowed = this.userPermissions.includes(permissionNeeded);
    return allowed;
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
