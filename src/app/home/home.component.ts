import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  collapse:boolean = true;
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  menuItems = [
    {
      name: 'Home',
      route: '',
      icon: 'fa-solid fa-house'
    },
    {
      name: 'Users',
      route:'users',
      icon:'fa-solid fa-users'
    },
    {
      name: 'Encuentros',
      icon: 'fa-solid fa-hands-praying'
    },
    {
      name: 'NewLife',
      icon: 'fa-solid fa-dove'
    },
    {
      name: 'Logout',
      icon: 'fa-solid fa-right-from-bracket'
    }

  ]

  openCollapse(event:any){
    this.collapse = !this.collapse;
    console.log(this.collapse);
  }

  logOut(){
    this.authService.logout().then( () =>
      this.route.navigate(['/login'])
    );
  }

}
