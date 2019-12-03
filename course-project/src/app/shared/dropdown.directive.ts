import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;

  @HostListener('document:click', ['$event.target']) toggleOpen(isDropdown){
    this.isOpen = this.elRef.nativeElement.contains(isDropdown) ? !this.isOpen : false;
  }

  constructor(private elRef: ElementRef) {

  }

}
