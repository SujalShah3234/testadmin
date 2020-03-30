import { Directive } from '@angular/core';
import { AfterContentInit, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit{

  public constructor(private el: ElementRef) {     
  }
  public ngAfterContentInit() {
      setTimeout(() => {
          this.el.nativeElement.focus();
      }, 500);
  }
}
