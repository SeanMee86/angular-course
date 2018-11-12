import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  username: string = '';
  isEmpty: boolean = true;

 emptyInput() {
   this.username = '';
   this.isEmpty = true;
 }

 onInput() {
   if(this.username !== ''){
     this.isEmpty = false;
   }else {
     this.isEmpty = true;
   }
 }

}
