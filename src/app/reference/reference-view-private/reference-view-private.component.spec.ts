import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceViewPrivateComponent } from './reference-view-private.component';

describe('ReferenceViewPrivateComponent', () => {
  let component: ReferenceViewPrivateComponent;
  let fixture: ComponentFixture<ReferenceViewPrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceViewPrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceViewPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
