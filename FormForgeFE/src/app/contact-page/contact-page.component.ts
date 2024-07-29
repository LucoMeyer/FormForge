import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements AfterViewInit {
  @ViewChild('complimentsModal', { static: false }) complimentsModal!: ElementRef;
  private modal: any;

  ngAfterViewInit(): void {
    this.modal = new bootstrap.Modal(this.complimentsModal.nativeElement, {
      backdrop: false, 
      keyboard: true 
    });
  }

  openComplimentsModal(): void {
    if (this.modal) {
      this.modal.show();
    }
  }

  doNothing(): void {
    // This function does nothing
  }

  runAway(event: MouseEvent): void {
    const button = event.target as HTMLElement;
    const buttonRect = button.getBoundingClientRect();
    const btnCenterX = buttonRect.left + buttonRect.width / 2;
    const btnCenterY = buttonRect.top + buttonRect.height / 2;

    const distanceX = btnCenterX - event.clientX;
    const distanceY = btnCenterY - event.clientY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const moveX = (distanceX / distance) * 50; 
    const moveY = (distanceY / distance) * 50; 

    let newLeft = button.offsetLeft + moveX;
    let newTop = button.offsetTop + moveY;

    
    if (newLeft < 0) newLeft = 0;
    if (newLeft + button.clientWidth > window.innerWidth) newLeft = window.innerWidth - button.clientWidth;
    if (newTop < 0) newTop = 0;
    if (newTop + button.clientHeight > window.innerHeight) newTop = window.innerHeight - button.clientHeight;

    button.style.left = `${newLeft}px`;
    button.style.top = `${newTop}px`;
  }
}
