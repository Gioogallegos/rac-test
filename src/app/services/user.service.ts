import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserAndPosts(id: number): Observable<any> {
    return forkJoin({
      user: this.http.get<User>(`${this.apiUrl}/${id}`),
      posts: this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    });
  }
}
    