import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form', {static: false})
  myForm: NgForm;
  defaultLevel = 'advanced';
  userInfo = {
    email: '',
    level: '',
    password: ''
  };
  submitted = false;

  onSubmit() {
    this.userInfo.email = this.myForm.controls.email.value;
    this.userInfo.level = this.myForm.controls.level.value;
    this.userInfo.password = this.myForm.controls.password.value;

    this.submitted = true;
  }

}
