import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateReservationComponent } from './admin-update-reservation.component';

describe('AdminUpdateReservationComponent', () => {
  let component: AdminUpdateReservationComponent;
  let fixture: ComponentFixture<AdminUpdateReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpdateReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
