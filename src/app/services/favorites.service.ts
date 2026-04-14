import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private storageKey = 'favorites';
  private _favorites$ = new BehaviorSubject<User[]>(this.loadFavorites());

  favorites$ = this._favorites$.asObservable();

  private loadFavorites(): User[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveFavorites(users: User[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  toggle(user: User) {
    const current = this._favorites$.value;
    const exists = current.find(u => u.id === user.id);
    let updated: User[];

    if (exists) {
      updated = current.filter(u => u.id !== user.id);
    } else {
      updated = [...current, user];
    }

    this._favorites$.next(updated);
    this.saveFavorites(updated);
  }

  isFavorite(id: number): boolean {
    return !!this._favorites$.value.find(u => u.id === id);
  }
}
