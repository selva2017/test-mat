import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersBfgsmsizeComponent } from './orders-bfgsmsize.component';

describe('OrdersBfgsmsizeComponent', () => {
  let component: OrdersBfgsmsizeComponent;
  let fixture: ComponentFixture<OrdersBfgsmsizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersBfgsmsizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersBfgsmsizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
