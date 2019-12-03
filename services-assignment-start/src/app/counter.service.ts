import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class CounterService {
  inactiveCnt = 0;
  activeCnt = 0;

  static inactiveCntClick(count) {
    console.log(`${count} Users have become Inactive.`)
  }

  static activeCntClick(count) {
    console.log(`${count} Users have become Active.`)
  }
}
