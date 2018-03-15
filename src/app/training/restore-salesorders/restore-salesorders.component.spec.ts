import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreSalesordersComponent } from './restore-salesorders.component';

describe('RestoreSalesordersComponent', () => {
  let component: RestoreSalesordersComponent;
  let fixture: ComponentFixture<RestoreSalesordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestoreSalesordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreSalesordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
