import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Output} from "@angular/core";

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output('sCre') serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bCre') blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput') serverContentInput: ElementRef;
  @ViewChild('addButton') buttonCheck: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
    console.dir(nameInput.value);
    this.buttonCheck.nativeElement.className = 'btn btn-primary ';
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
    console.log(this.buttonCheck);
    this.buttonCheck.nativeElement.className = 'btn btn-success';
  }
}
