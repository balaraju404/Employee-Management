import { Directive, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import * as bootstrap from 'bootstrap'; // Import Bootstrap JavaScript

@Directive({
  selector: '[appBootstrapPopover]'
})
export class BootstrapPopoverDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    // Initialize Bootstrap popover
    const popover = new bootstrap.Popover(this.elementRef.nativeElement, {
      trigger: 'manual' // Set trigger to manual
    });

    // Listen to mouseenter event and show popover
    this.elementRef.nativeElement.addEventListener('mouseenter', () => {
      popover.show();
    });

    // Listen to mouseleave event and hide popover
    this.elementRef.nativeElement.addEventListener('mouseleave', () => {
      popover.hide();
    });
  }
}
