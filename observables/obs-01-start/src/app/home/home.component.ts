import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Observer, Subscription} from "rxjs";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObs: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObs = interval(1000).subscribe(count => {
    //   console.log(count);
    // })
    const customIntervalObservable: Observable<any> = new Observable((observer: Observer<any>) => {
      let count: number = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'))
        }
        count++
      }, 1000);
    })
    this.firstObs = customIntervalObservable
      .pipe(filter((data: number) => {
        return data > 0;
      }), map(data => {
        return `Round: ${data + 1}`;
      }))
      .subscribe(data => {
      console.log(data);
    }, error => {
        console.log(error);
      }, () => {
      console.log('Completed!')
    })
  }

  ngOnDestroy(): void {
    this.firstObs.unsubscribe();
  }

}
