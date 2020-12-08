import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUtilityComponent } from './view-utility.component';

describe('ViewUtilityComponent', () => {
  let component: ViewUtilityComponent;
  let fixture: ComponentFixture<ViewUtilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUtilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
