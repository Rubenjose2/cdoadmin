import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Preference } from 'src/app/helpers/preference';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  @Input() screenInput!: number;

  screenSize = new Preference;
  @Output() menuClicked = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {
  }

  openMenu(){
    this.menuClicked.emit(true);
  }

}
