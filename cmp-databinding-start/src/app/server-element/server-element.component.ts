import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  AfterContentInit,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
}
  from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // None, Native
})
export class ServerElementComponent
    implements
        OnInit,
        OnChanges,
        AfterContentInit
{

  @Input('srvElement') element: {type: string, name: string, content: string};
  @ViewChild('heading') header: ElementRef;
  @ContentChild('contentParagraph') content: ElementRef;

  constructor() {
    console.log('constructor called');
  }

  ngOnInit() {
    console.log('ng on init called')
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called!');
    console.log(changes);
    console.log(this.content.nativeElement.textContent);
  }

  ngAfterContentInit() {
    console.log(this.content.nativeElement.textContent);
  }

}
