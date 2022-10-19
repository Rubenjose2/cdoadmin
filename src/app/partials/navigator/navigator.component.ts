import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.sass']
})
export class NavigatorComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  back(){
    this.location.back();
  }

}
