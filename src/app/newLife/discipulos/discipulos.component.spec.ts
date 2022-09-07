import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscipulosComponent } from './discipulos.component';

describe('DiscipulosComponent', () => {
  let component: DiscipulosComponent;
  let fixture: ComponentFixture<DiscipulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscipulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscipulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
