import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUtilityComponent } from './add-utility.component';

describe('AddUtilityComponent', () => {
  let component: AddUtilityComponent;
  let fixture: ComponentFixture<AddUtilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUtilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
