import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validation-results',
  templateUrl: './validation-results.component.html',
  styleUrls: ['./validation-results.component.scss']
})
export class ValidationResultsComponent {
  @Input() result: any;
}
