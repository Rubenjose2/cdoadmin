import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyassignsComponent } from './myassigns.component';

describe('MyassignsComponent', () => {
  let component: MyassignsComponent;
  let fixture: ComponentFixture<MyassignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyassignsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyassignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
