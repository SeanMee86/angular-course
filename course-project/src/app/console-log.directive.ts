import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appConsoleLog]'
})
export class ConsoleLogDirective {

  @HostBinding('style.left') left: string;
  @HostBinding('style.top') top: string;
  @HostBinding('style.position') position: string = 'relative';
  constructor(private elementRef: ElementRef) { }

  @HostListener('click') makeMovable = () => {
    let el = this.elementRef.nativeElement;
    let offsetOrigin = this.elementRef.nativeElement.offsetLeft;
    let yPos = 0;
    console.dir(el);
    window.onkeydown = (e) => {
      switch(e.code){
        case "ArrowRight":
          this.left = offsetOrigin - el.offsetLeft + 5 + 'px';
          break;
        case "ArrowLeft":
          this.left = el.offsetLeft - offsetOrigin - 5 + 'px';
          break;
        case "ArrowDown":
          this.top = yPos + 5 + 'px';
          yPos += 5;
          break;
        case "ArrowUp":
          this.top = yPos - 5 + 'px';
          yPos -= 5;
      }
    }
  };
}
