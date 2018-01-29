import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedOrdersComponent } from './selected-orders.component';

describe('SelectedOrdersComponent', () => {
  let component: SelectedOrdersComponent;
  let fixture: ComponentFixture<SelectedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
