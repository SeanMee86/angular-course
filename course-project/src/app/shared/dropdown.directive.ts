import {
  Directive,
  Renderer2,
  ElementRef,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('onclick') onMouseClick(eventData: Event){
    console.log(eventData);
  }

}
