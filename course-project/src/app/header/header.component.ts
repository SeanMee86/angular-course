import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() displayChosen = new EventEmitter<string>();
  navLinks: string[] = [
      'Recipes',
      'Shopping List'
  ];

  constructor() { }

  ngOnInit() {
  }

  chooseDisplay(e) {
    this.displayChosen.emit(e.target.innerText);
  }

}
