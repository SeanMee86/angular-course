import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onIntervalFired(e: number) {
    if(e % 2 !== 0) {
      this.oddNumbers.push(e);
    }else {
      this.evenNumbers.push(e);
    }
  }
}
