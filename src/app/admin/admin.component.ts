import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AppComponent } from '../app.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent,AppComponent,RouterModule,RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
