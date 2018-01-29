import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersBfgsmComponent } from './orders-bfgsm.component';

describe('OrdersBfgsmComponent', () => {
  let component: OrdersBfgsmComponent;
  let fixture: ComponentFixture<OrdersBfgsmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersBfgsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersBfgsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
