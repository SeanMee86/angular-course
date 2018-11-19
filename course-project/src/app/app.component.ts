import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // recipeDisplay: boolean = true;
  // shoppingDisplay: boolean = false;
  loadedFeature = 'Recipes';

  whichDisplay(e) {
    // if(e === 'Recipes') {
    //   this.recipeDisplay = true;
    //   this.shoppingDisplay = false;
    // }else {
    //   this.recipeDisplay = false;
    //   this.shoppingDisplay = true;
    // }
    this.loadedFeature = e;
  }
}
