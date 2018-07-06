import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorSignupComponent } from './creator-signup.component';

describe('CreatorSignupComponent', () => {
  let component: CreatorSignupComponent;
  let fixture: ComponentFixture<CreatorSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
