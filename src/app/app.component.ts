import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EmployeeService } from './services/employee.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoreService } from './core/core.service';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminComponent } from './admin/admin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHome,
  faUser,
  faAdd,
  faSignOut,
  faDotCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    EmpAddEditComponent,
    MatDialogModule,
    MatDatepickerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    SidebarComponent,
    AdminComponent,
    FontAwesomeModule,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'select',
    'firstname',
    'lastname',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experince',
    // 'package',
    'action',
  ];
  faHome = faHome;
  faUser = faUser;
  faSignOut = faSignOut;
  faAdd = faAdd;
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  clickedRows = new Set<any>();
  // dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private empService: EmployeeService,
    private coreService: CoreService
  ) {}
  ngOnInit(): void {
    this.getemployee();

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 30);
  }
  openAddEditEmp() {
    const DialogRef = this.dialog.open(EmpAddEditComponent);
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getemployee();
        }
      },
    });
  }
  // getEmployees() {

  //   this.empService.getemployee().subscribe((employees) => {
  //     this.dataSource.data = employees;
  //   });
  // }
  getemployee() {
    this.empService.getemployee().subscribe((employees) => {
      this.dataSource.data = employees;
    });
    this.empService.getemployee().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmployee(id: number) {
    this.empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Employee Delete!', 'done');
        this.getemployee();
      },
      error: console.log,
    });
  }
  openEditEmp(data: any) {
    const DialogRef = this.dialog.open(EmpAddEditComponent, {
      data,
    });
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getemployee();
        }
      },
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
    return this.selection.selected.length === this.dataSource.data.length;
  }

  // masterToggle() {
  //   this.isAllSelected()
  //     ? this.selection.clear()
  //     : this.dataSource.data.forEach((row) => this.selection.select(row));
  // }

  // masterToggle() {
  //   if (this.isAllSelected()) {
  //     this.selection.clear();
  //   } else {
  //     this.dataSource.data.forEach((row) => this.selection.select(row));
  //   }
  // }
  // clearSelection() {
  //   this.selection.clear();
  // }
  // clearAllData() {
  //   this.dataSource.data = []; // Clear the data
  //   this.clearSelection(); // Clear selections
  // }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach((row) => this.selection.select(row));
    }
  }

  clearSelection() {
    this.selection.clear();
  }

  clearAllData() {
    this.dataSource.data = [];
    this.clearSelection();
  }

  deleteSelectedEmployees() {
    const selectedIds = this.selection.selected.map((emp) => emp.id);
    selectedIds.forEach((id) => {
      this.empService.deleteEmployee(id).subscribe({
        next: (res) =>
          this.coreService.openSnackBar(`Employee ${id} deleted!`, 'Done'),
        error: (err) => console.error(`Error deleting employee ${id}:`, err),
        complete: () => this.getemployee(), // Refresh the list after all deletions are processed
      });
    });

    this.selection.clear();
  }

  openEditSelectedEmployee() {
    const selectedId = this.selection.selected[0].id; // Assuming only one row can be edited at a time
    // Implement edit logic for selected row
  }
}
