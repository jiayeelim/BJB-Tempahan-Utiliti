import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewReservationComponent } from './admin-view-reservation.component';

describe('AdminViewReservationComponent', () => {
  let component: AdminViewReservationComponent;
  let fixture: ComponentFixture<AdminViewReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
