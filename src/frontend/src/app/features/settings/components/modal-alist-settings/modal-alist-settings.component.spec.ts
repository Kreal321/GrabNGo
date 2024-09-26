import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlistSettingsComponent } from './modal-alist-settings.component';

describe('ModalAlistSettingsComponent', () => {
  let component: ModalAlistSettingsComponent;
  let fixture: ComponentFixture<ModalAlistSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAlistSettingsComponent]
    });
    fixture = TestBed.createComponent(ModalAlistSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
