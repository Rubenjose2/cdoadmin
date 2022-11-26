import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalCommentsComponent } from './historical-comments.component';

describe('HistoricalCommentsComponent', () => {
  let component: HistoricalCommentsComponent;
  let fixture: ComponentFixture<HistoricalCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
