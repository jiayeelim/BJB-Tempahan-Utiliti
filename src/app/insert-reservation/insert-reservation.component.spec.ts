import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertReservationComponent } from './insert-reservation.component';

describe('InsertReservationComponent', () => {
  let component: InsertReservationComponent;
  let fixture: ComponentFixture<InsertReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
