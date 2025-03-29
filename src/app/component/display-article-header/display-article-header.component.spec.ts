import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayArticleHeaderComponent } from './display-article-header.component';

describe('DisplayArticleHeaderComponent', () => {
  let component: DisplayArticleHeaderComponent;
  let fixture: ComponentFixture<DisplayArticleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayArticleHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayArticleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
