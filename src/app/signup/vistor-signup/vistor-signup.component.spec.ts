import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistorSignupComponent } from './vistor-signup.component';

describe('VistorSignupComponent', () => {
  let component: VistorSignupComponent;
  let fixture: ComponentFixture<VistorSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistorSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistorSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
