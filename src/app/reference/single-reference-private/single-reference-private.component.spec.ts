import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReferencePrivateComponent } from './single-reference-private.component';

describe('SingleReferencePrivateComponent', () => {
  let component: SingleReferencePrivateComponent;
  let fixture: ComponentFixture<SingleReferencePrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleReferencePrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleReferencePrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
