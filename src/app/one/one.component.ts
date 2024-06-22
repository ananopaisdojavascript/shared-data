import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-one',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './one.component.html',
  styleUrl: './one.component.css'
})
export class OneComponent {
  fb = inject(UntypedFormBuilder);

  sharedService = inject(SharedService);

  form = this.fb.group({
    name: [''],
    email: ['']
  });

  onSubmit() {
    if (this.form.valid) {
      this.sharedService.createDataToSource(this.form.value)
    }
  }
}
