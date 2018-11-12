import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment-four';

  oddEventData: number[] = [];

  evenEventData: number[] = [];

  onEvent(e: number) {
    if(e % 2 !== 0) {
      this.oddEventData.push(e);
    }else {
      this.evenEventData.push(e);
    }
  }
}
