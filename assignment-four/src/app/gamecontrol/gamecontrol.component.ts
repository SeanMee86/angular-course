import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-gamecontrol',
  templateUrl: './gamecontrol.component.html',
  styleUrls: ['./gamecontrol.component.css']
})
export class GamecontrolComponent implements OnInit {

  @Output() time = new EventEmitter<number>();
  i: number = 1;

  timer;

  constructor() {

  }

  ngOnInit() {

  }

  onStartTimer() {
    this.timer = setInterval(() => {
      this.time.emit(this.i);
      this.i++;
    }, 1000);
  }

  endTimer() {
    clearInterval(this.timer);
  }
}
