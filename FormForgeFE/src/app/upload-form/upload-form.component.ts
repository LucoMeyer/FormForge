import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

declare var bootstrap: any;

interface ValidationResult {
  success: boolean;
  missingFields: string[];
  docType: string;
}

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements AfterViewInit {
  @ViewChild('resultModal', { static: false }) resultModal!: ElementRef;
  selectedFiles: File[] = [];
  results: ValidationResult[] = [];
  modal: any;

  ngAfterViewInit(): void {
    this.initializeModal();
  }

  initializeModal(): void {
    if (this.resultModal && this.resultModal.nativeElement) {
      this.modal = new bootstrap.Modal(this.resultModal.nativeElement, {
        backdrop: false, 
        keyboard: true 
      });
    }
  }

  onFileSelected(event: any): void {
    const files = Array.from(event.target.files) as File[];
    if (files.length > 2) {
      alert('Please upload only up to 2 forms.');
      this.selectedFiles = []; 
      return;
    }
    this.selectedFiles = files;
  }

  async onSubmit(): Promise<void> {
    if (this.selectedFiles.length > 2) {
      alert('Please upload only up to 2 forms.');
      return;
    }
    
    this.results = [];
    for (const file of this.selectedFiles) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const CONTROLLER = "/api/v1";
        // const response = await fetch('http://192.168.88.136:12345' + CONTROLLER + '/upload', {
        const response = await fetch('http://' + CONTROLLER + '/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload file: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('File upload response:', result);

        const missingFields = result.missing_fields || [];

        this.results.push({
          success: missingFields.length === 0,
          missingFields: missingFields,
          docType: result.form_type
        });

        if (this.results.length === this.selectedFiles.length) {
          this.showModal();
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }

  showModal(): void {
    if (this.modal) {
      this.modal.show();
    }
  }
}
