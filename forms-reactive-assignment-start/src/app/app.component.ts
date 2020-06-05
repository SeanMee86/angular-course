import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  submitted = false;
  projName: string;
  projEmail: string;
  projStatus: string;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'projectName': new FormControl(
        null,
        Validators.required,
        this.restrictProjectName
      ),
      'email': new FormControl(
        null,
        [
          Validators.required,
          Validators.email
        ]
      ),
      'projectStatus': new FormControl('stable')
    })
  }

  onSubmit() {
    this.projName = this.myForm.get('projectName').value;
    this.projEmail = this.myForm.get('email').value;
    this.projStatus = this.myForm.get('projectStatus').value;

    this.submitted = true;
    this.myForm.reset();
  }

  restrictProjectName = (control: FormControl): Promise<{'nameIsForbidden': boolean}> | Observable<{'nameIsForbidden': boolean}> => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({'nameIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1000)
    })
  }

  get email() {
    return this.myForm.get('email');
  }

  get projectName() {
    return this.myForm.get('projectName');
  }
}
