import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  userSub: Subscription;

  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => this.isAuthenticated = !!user
    );
  }

  addToDB() {
    this.dataStorage.storeData();
  }

  onFetchRecipes() {
    this.dataStorage.fetchData().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
