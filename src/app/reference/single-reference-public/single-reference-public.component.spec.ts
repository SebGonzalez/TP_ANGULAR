import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReferencePublicComponent } from './single-reference-public.component';

describe('SingleReferencePublicComponent', () => {
  let component: SingleReferencePublicComponent;
  let fixture: ComponentFixture<SingleReferencePublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleReferencePublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleReferencePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
