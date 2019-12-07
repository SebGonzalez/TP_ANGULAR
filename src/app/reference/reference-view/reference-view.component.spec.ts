import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceViewComponent } from './reference-view.component';

describe('ReferenceViewComponent', () => {
  let component: ReferenceViewComponent;
  let fixture: ComponentFixture<ReferenceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
