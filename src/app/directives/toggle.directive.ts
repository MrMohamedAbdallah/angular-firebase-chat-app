import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggle]'
})
export class ToggleDirective {

  constructor() { }


  @HostListener("click")
  onClick(){
    if(document.body.classList.contains("dark")){
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }

}
