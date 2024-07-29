
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FormForge';

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const background = document.querySelector('.background') as HTMLElement;
    const amountMovedX = (event.clientX / window.innerWidth) * 20;
    const amountMovedY = (event.clientY / window.innerHeight) * 20;
    background.style.transform = `translate(${amountMovedX}px, ${amountMovedY}px)`;
  }
}
