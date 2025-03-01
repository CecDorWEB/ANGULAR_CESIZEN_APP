import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayStartRessourceComponent } from './display-start-ressource.component';

describe('DisplayStartRessourceComponent', () => {
  let component: DisplayStartRessourceComponent;
  let fixture: ComponentFixture<DisplayStartRessourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayStartRessourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayStartRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
