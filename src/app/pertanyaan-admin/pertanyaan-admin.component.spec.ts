import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PertanyaanAdminComponent } from './pertanyaan-admin.component';

describe('PertanyaanAdminComponent', () => {
  let component: PertanyaanAdminComponent;
  let fixture: ComponentFixture<PertanyaanAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PertanyaanAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PertanyaanAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
