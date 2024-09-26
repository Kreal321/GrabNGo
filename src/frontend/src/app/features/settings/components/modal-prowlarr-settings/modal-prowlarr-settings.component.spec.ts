import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProwlarrSettingsComponent } from './modal-prowlarr-settings.component';

describe('ModalProwlarrSettingsComponent', () => {
  let component: ModalProwlarrSettingsComponent;
  let fixture: ComponentFixture<ModalProwlarrSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalProwlarrSettingsComponent]
    });
    fixture = TestBed.createComponent(ModalProwlarrSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
