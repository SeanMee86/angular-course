import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navLinks: string[] = [
      'Recipes',
      'Authenticate',
      'Shopping List'
  ];

  constructor(
    private dataStorage: DataStorageService
  ) { }

  ngOnInit() {
  }

  addToDB() {
    this.dataStorage.storeData();
  }

  onFetchRecipes() {
    this.dataStorage.fetchData().subscribe();
  }
}
