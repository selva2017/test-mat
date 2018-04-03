import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExtComponent } from './admin-ext.component';

describe('AdminExtComponent', () => {
  let component: AdminExtComponent;
  let fixture: ComponentFixture<AdminExtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminExtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
