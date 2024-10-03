import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTmdbSettingsComponent } from './modal-tmdb-settings.component';

describe('ModalTmdbSettingsComponent', () => {
  let component: ModalTmdbSettingsComponent;
  let fixture: ComponentFixture<ModalTmdbSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTmdbSettingsComponent]
    });
    fixture = TestBed.createComponent(ModalTmdbSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
