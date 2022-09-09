import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentroPeopleComponent } from './encuentro-people.component';

describe('EncuentroPeopleComponent', () => {
  let component: EncuentroPeopleComponent;
  let fixture: ComponentFixture<EncuentroPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuentroPeopleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncuentroPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
