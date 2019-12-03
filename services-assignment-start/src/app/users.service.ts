import {Injectable} from "@angular/core";
import {CounterService} from "./counter.service";

@Injectable({providedIn: 'root'})
export class UsersService {
  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];

  constructor(private counterService: CounterService) {}
  setUser2Inactive(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
    CounterService.inactiveCntClick(++this.counterService.inactiveCnt);
  }

  setUser2Active(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
    CounterService.activeCntClick(++this.counterService.activeCnt);
  }
}
