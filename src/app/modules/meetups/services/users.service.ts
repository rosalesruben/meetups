import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IUser } from 'src/app/models/IUser';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  ENDPOINT: string = '/api/users';
  constructor(private http: HttpClient) {}

  delete(id: string) {
    return this.http.delete(`${this.ENDPOINT}/${id}`);
  }

  create(user: IUser) {
    return this.http.post(this.ENDPOINT, user);
  }

  update(id: string, user: IUser) {
    return this.http.patch(`${this.ENDPOINT}/${id}`, user);
  }

  findById(id: string): Observable<IUser> {
    return this.http.get(`${this.ENDPOINT}/${id}`).pipe(
      map((user: any) => {
        return {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          username: user.username,
          password: user.password,
          role: user.role,
          /* saleArea: user.saleArea, */
          id: user._id,
        };
      })
    );
  }

  find(): Observable<IUser[]> {
    return this.http.get(this.ENDPOINT).pipe(
      map((users: any[]) => {
        return users.map((user) => {
          return {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
            password: user.password,
            role: user.role,
            /* saleArea: user.saleArea, */
            id: user._id,
          };
        });
      })
    );
  }
}
