import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDynamicComponentsComponent } from './ng-dynamic-components.component';

describe('NgDynamicComponentsComponent', () => {
  let component: NgDynamicComponentsComponent;
  let fixture: ComponentFixture<NgDynamicComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgDynamicComponentsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDynamicComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
