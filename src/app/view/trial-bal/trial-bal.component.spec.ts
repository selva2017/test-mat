import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialBalComponent } from './trial-bal.component';

describe('TrialBalComponent', () => {
  let component: TrialBalComponent;
  let fixture: ComponentFixture<TrialBalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialBalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialBalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
