import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeStatusComponent } from './badge-status.component';

describe('BadgeStatusComponent', () => {
  let component: BadgeStatusComponent;
  let fixture: ComponentFixture<BadgeStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeStatusComponent]
    });
    fixture = TestBed.createComponent(BadgeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
