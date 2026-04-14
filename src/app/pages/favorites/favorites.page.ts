import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPage {
  favorites$: Observable<User[]> = this.favSvc.favorites$;

  constructor(private favSvc: FavoritesService, private router: Router) {}

  openDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  remove(user: User) {
    this.favSvc.toggle(user);
  }
}
