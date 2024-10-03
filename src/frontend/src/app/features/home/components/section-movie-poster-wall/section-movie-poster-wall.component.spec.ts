import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionMoviePosterWallComponent } from './section-movie-poster-wall.component';

describe('SectionMoviePosterWallComponent', () => {
  let component: SectionMoviePosterWallComponent;
  let fixture: ComponentFixture<SectionMoviePosterWallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionMoviePosterWallComponent]
    });
    fixture = TestBed.createComponent(SectionMoviePosterWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
