import { P } from '@angular/cdk/keycodes';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PermissionService } from '../services/permission.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  collapse:boolean = true;
  screenWidth!: number;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  @HostListener('window:resize',['$event'])
  onResize() {
    //this.configureSideNav();
  }
  constructor(private authService: AuthService, private route: Router, private permissions: PermissionService) {
    this.screenWidth = window.innerWidth;
    window.onresize = () =>{
      this.screenWidth = window.innerWidth;
    }
   }

  menuItems = [
    {
      name: 'Home',
      route: '',
      icon: 'fa-solid fa-house',
      submenu: false,
      show:false,
      permission:['user']
    },
    {
      name: 'Users',
      route:'users',
      icon:'fa-solid fa-users',
      submenu: false,
      show:false,
      permission:['superAdmin']
    },
    {
      name: 'Encuentros',
      icon: 'fa-solid fa-hands-praying',
      submenu: true,
      show:false,
      permission:['admin'],
      submenus :[
        {
          name:'Varones',
          route: 'encuentros',
          permission: ['admin'],
          queryParams: {
            'type':'varones'
          }
        },
        {
          name:'Mujeres',
          route: 'encuentros',
          permission: ['admin'],
          queryParams:
          {
            'type':'mujeres'
          }
        },
        {
          name:'Jovenes',
          route: 'encuentros',
          permission: ['admin'],
          queryParams:
          {
            'type':'jovenes'
          }
        },
      ]
    },
    {
      name: 'NewLife',
      icon: 'fa-solid fa-dove',
      submenu: true,
      show:false,
      permission:['admin','user'],
      submenus:[
        {
          name:'Mis Seguimientos',
          permission: ['user','admin','coach'],
          route:'newlife/myassigns',

        },
        {
          name:'Convertidos/Invidatos',
          permission: ['admin'],
          route:'newlife/newpeople',

        },
        {
          name:'Seguimientos',
          permission: ['admin'],
          route:'newlife/messages',
        },
        {
          name: 'Asignaciones',
          route:'newlife/asignaciones',
          permission: ['admin'],
          queryParams: {}
        },
        {
          name:'Consolidadores',
          route:'newlife/discipuladores',
          permission: ['admin'],
          queryParams: {}
        }
      ]
    },
    {
      name: 'Logout',
      icon: 'fa-solid fa-right-from-bracket',
      show:false,
      route:'logout',
      submenu: false,
      permission:['user']
    }

  ]

  ngOnInit(): void {}

  openCollapse(index:number){
    this.menuItems[index].show = !this.menuItems[index].show
  }
  parentOpenMenu(event:any){
    console.log(event)
    this.sidenav.open()
  }


  logOut(){
    this.authService.logout().then( () =>
      this.route.navigate(['/logout'])
    );
  }

}
