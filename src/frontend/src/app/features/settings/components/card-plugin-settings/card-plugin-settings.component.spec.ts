import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPluginSettingsComponent } from './card-plugin-settings.component';

describe('CardPluginSettingsComponent', () => {
  let component: CardPluginSettingsComponent;
  let fixture: ComponentFixture<CardPluginSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPluginSettingsComponent]
    });
    fixture = TestBed.createComponent(CardPluginSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
