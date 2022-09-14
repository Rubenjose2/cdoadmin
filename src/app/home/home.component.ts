import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.logout().then( () =>
      this.route.navigate(['/login'])
    );
  }

}
