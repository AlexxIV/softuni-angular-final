import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuCheckbox: boolean = false;

  constructor(private authService: AuthService) { }

  expand() {
    this.menuCheckbox = !this.menuCheckbox
  }


}
