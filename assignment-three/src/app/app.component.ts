import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayParagraph: boolean = false;
  numberOfClicks = 0;
  clickHolder: string[] = [];

  onButtonClick () {
    this.displayParagraph ? this.displayParagraph = false : this.displayParagraph = true;
    this.numberOfClicks++;
    // this.clickHolder.push(this.numberOfClicks);
    this.clickHolder.push(new Date());
  }

  getBackground () {
    if(this.numberOfClicks > 4) {
      return 'blue';
    }
  }
}
