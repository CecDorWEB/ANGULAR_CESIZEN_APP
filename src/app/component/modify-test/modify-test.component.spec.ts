import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTestComponent } from './modify-test.component';

describe('ModifyTestComponent', () => {
  let component: ModifyTestComponent;
  let fixture: ComponentFixture<ModifyTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
