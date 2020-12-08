import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUtilityComponent } from './update-utility.component';

describe('UpdateUtilityComponent', () => {
  let component: UpdateUtilityComponent;
  let fixture: ComponentFixture<UpdateUtilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUtilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
