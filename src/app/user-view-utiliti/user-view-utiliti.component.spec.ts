import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewUtilitiComponent } from './user-view-utiliti.component';

describe('UserViewUtilitiComponent', () => {
  let component: UserViewUtilitiComponent;
  let fixture: ComponentFixture<UserViewUtilitiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewUtilitiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewUtilitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
