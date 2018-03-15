import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSalesordersComponent } from './delete-salesorders.component';

describe('DeleteSalesordersComponent', () => {
  let component: DeleteSalesordersComponent;
  let fixture: ComponentFixture<DeleteSalesordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSalesordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSalesordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
