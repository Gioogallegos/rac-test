import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  users$: Observable<User[]> = this.userService.getUsers();
  search$ = new BehaviorSubject<string>('');
  sort$ = new BehaviorSubject<'asc' | 'desc'>('asc');

  filtered$: Observable<User[]> = combineLatest([
    this.users$,
    this.search$.pipe(debounceTime(200)),
    this.sort$
  ]).pipe(
    map(([users, q, sort]) => {
      const query = (q || '').trim().toLowerCase();
      const filtered = users.filter(u => u.name.toLowerCase().includes(query));
      return filtered.sort((a, b) =>
        sort === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
    })
  );

  constructor(private userService: UserService, private router: Router) {}

  openDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }

  trackById(_: number, item: User) {
    return item.id;
  }

  setSort(value: string | number | null | undefined) {
    const order: 'asc' | 'desc' = value === 'desc' ? 'desc' : 'asc';
    this.sort$.next(order);
  }

  /** Método para iniciales (evita error en template) */
  getInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .slice(0, 2)
      .join('');
  }
}
