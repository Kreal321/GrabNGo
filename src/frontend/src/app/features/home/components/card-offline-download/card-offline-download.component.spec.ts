import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOfflineDownloadComponent } from './card-offline-download.component';

describe('CardOfflineDownloadComponent', () => {
  let component: CardOfflineDownloadComponent;
  let fixture: ComponentFixture<CardOfflineDownloadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardOfflineDownloadComponent]
    });
    fixture = TestBed.createComponent(CardOfflineDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
