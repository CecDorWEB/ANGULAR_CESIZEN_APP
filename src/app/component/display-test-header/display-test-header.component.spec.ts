import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTestHeaderComponent } from './display-test-header.component';

describe('DisplayTestHeaderComponent', () => {
  let component: DisplayTestHeaderComponent;
  let fixture: ComponentFixture<DisplayTestHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayTestHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayTestHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
