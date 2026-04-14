import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {
  data: { user: any; posts: any[] } | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private favSvc: FavoritesService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const idStr = this.route.snapshot.paramMap.get('id');
    if (!idStr) return;
    const id = Number(idStr);

    this.userService.getUserAndPosts(id).subscribe({
      next: res => {
        this.data = res;
        this.loading = false;
      },
      error: async () => {
        this.loading = false;
        const t = await this.toastCtrl.create({
          message: 'Error al cargar datos',
          duration: 3000,
          color: 'danger'
        });
        t.present();
      }
    });
  }

  toggleFav() {
    if (this.data?.user) this.favSvc.toggle(this.data.user);
  }

  isFav(): boolean {
    return this.data ? this.favSvc.isFavorite(this.data.user.id) : false;
  }
}
