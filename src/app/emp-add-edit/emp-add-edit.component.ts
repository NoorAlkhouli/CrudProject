import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { MatIconModule } from '@angular/material/icon';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css',
})
export class EmpAddEditComponent implements OnInit {
  empform: FormGroup;
  education: string[] = [
    'Matric',
    'Deploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService:CoreService,
    
  ) {
    this.empform = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experince: '',
      // package: '',
    });
  }

  ngOnInit(): void {
    this.empform.patchValue(this.data);
  }

  OnFormSubmit() {
    if (this.empform.valid) {
      if (this.data) {
        // console.log(this.empform.value)
        this.empService.updateEmployee(this.data.id,this.empform.value).subscribe({
          next: (val: any) => {
             this.coreService.openSnackBar('Employee Update!');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      } else {
        // console.log(this.empform.value)
        this.empService.addemployee(this.empform.value).subscribe({
          next: (val: any) => {
           this.coreService.openSnackBar('Employee Added Sucessfuly');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    }
  }
}
