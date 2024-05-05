import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHome,
  faUser,
  faAdd,
  faSignOut,
  faDotCircle,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  faHome = faHome;
  faUser = faUser;
  faSignOut = faSignOut;
  faAdd = faAdd;
}
