import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLifeComponent } from './new-life.component';

describe('NewLifeComponent', () => {
  let component: NewLifeComponent;
  let fixture: ComponentFixture<NewLifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLifeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
