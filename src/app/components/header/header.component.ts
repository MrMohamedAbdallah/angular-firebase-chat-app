import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;
  user: any = null;

  constructor(private authService: AuthService) { 

    // Subscribe to user state
    this.authService.userStateSubject.subscribe(state => {
      this.isLogged = state;
      // Get the user value
      this.user = this.authService.getUser();
    })
    this.isLogged = this.authService.getUserState();
    this.user = this.authService.getUser();
  }

  ngOnInit() {
  }


  logout(){
    this.authService.logout();
  }

}
