import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: "[appWords]"
})
export class WordsDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    let wordsList = this.elementRef.nativeElement;

    let counter = 0; // The words counter

    // Append the first child
    let firstChild = wordsList.children[0].cloneNode(true);

    wordsList.appendChild(firstChild);

    // Set the transition value
    wordsList.style.transition = "transform .8s ease-in-out";

    // Animate
    setInterval(() => {
      let length = wordsList.children.length;

      counter = (counter + 1) % length;

      let transform = "translateY(-" + 100 * counter + "%)";

      wordsList.style.transform = transform;

      if (counter == length - 1) {
        setTimeout(() => {
          wordsList.style.transition = "transform 0s ease-in-out";
          wordsList.style.transform = "translateY(0%)";
          counter = 0;
        }, 800);
      } else {
        wordsList.style.transition = "transform .8s ease-in-out";
      }
    }, 5000);
  }
}
