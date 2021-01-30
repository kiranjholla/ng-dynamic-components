import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentOutletComponent } from './component-outlet.component';

describe('ComponentOutletComponent', () => {
  let component: ComponentOutletComponent;
  let fixture: ComponentFixture<ComponentOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
