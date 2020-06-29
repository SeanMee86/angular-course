import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Ana'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(
          null, [
            Validators.required,
            this.forbiddenNames
          ]
        ),
        'email': new FormControl(
          null,
          [
            Validators.required,
            Validators.email
          ],
          [
            this.forbiddenEmails
          ]
        )
      }),
      'gender': new FormControl(this.genders[0]),
      'hobbies': new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value => console.log(value))
    // );
    this.signupForm.statusChanges.subscribe(
      (value => console.log(value))
    );
    this.signupForm.setValue({
      'userData': {
        'username': 'Sean',
        'email': 'seanmee8186@gmail.com'
      },
      'gender': 'male',
      'hobbies': []
    });
    this.signupForm.patchValue({
      'userData': {
        'username': 'Ana'
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    // this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signupForm.get('hobbies') as FormArray).push(control);
    console.log(this.signupForm.get('hobbies'));
  }

  forbiddenNames = (control: FormControl): {[s: string]: boolean} => {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {
        'nameIsForbidden': true
      };
    }
    return null;
  }

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenEmails = (control: FormControl): Promise<any> | Observable<any> => {
    return new Promise<any>(resolve => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }
}
