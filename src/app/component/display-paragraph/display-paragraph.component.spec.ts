import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayParagraphComponent } from './display-paragraph.component';

describe('DisplayParagraphComponent', () => {
  let component: DisplayParagraphComponent;
  let fixture: ComponentFixture<DisplayParagraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayParagraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
