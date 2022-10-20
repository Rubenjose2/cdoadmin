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

  menuItems = [
    {
      name: 'Home',
      route: '',
      icon: 'fa-solid fa-house',
      submenu: false,
      show:false
    },
    {
      name: 'Users',
      route:'users',
      icon:'fa-solid fa-users',
      submenu: false,
      show:false
    },
    {
      name: 'Encuentros',
      icon: 'fa-solid fa-hands-praying',
      submenu: true,
      show:false,
      submenus :[
        {
          name:'Varones',
          route: 'encuentros',
          queryParams: {
            'type':'varones'
          }
        },
        {
          name:'Mujeres',
          route: 'encuentros',
          queryParams: 
          {
            'type':'mujeres'
          }
        },
      ]
    },
    {
      name: 'NewLife',
      icon: 'fa-solid fa-dove',
      submenu: true,
      show:false,
      submenus:[
        {
          name:'Convertidos/Invidatos',
          route:'newlife/newpeople'
        },
        {
          name: 'Asignaciones',
          route:'newlife/asignaciones',
          queryParams: {}
        },
        {
          name:'Consolidadores',
          route:'newlife/discipuladores',
          queryParams: {}
        }
      ]
    },
    {
      name: 'Logout',
      icon: 'fa-solid fa-right-from-bracket',
      show:false,
      submenu: true
    }

  ]
  
  ngOnInit(): void {

  }

  openCollapse(index:number){
    this.menuItems[index].show = !this.menuItems[index].show
  }

  logOut(){
    this.authService.logout().then( () =>
      this.route.navigate(['/login'])
    );
  }

}
