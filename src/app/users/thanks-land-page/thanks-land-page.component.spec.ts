import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksLandPageComponent } from './thanks-land-page.component';

describe('ThanksLandPageComponent', () => {
  let component: ThanksLandPageComponent;
  let fixture: ComponentFixture<ThanksLandPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThanksLandPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThanksLandPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
