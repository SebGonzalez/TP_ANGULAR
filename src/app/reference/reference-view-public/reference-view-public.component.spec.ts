import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceViewPublicComponent } from './reference-view-public.component';

describe('ReferenceViewPublicComponent', () => {
  let component: ReferenceViewPublicComponent;
  let fixture: ComponentFixture<ReferenceViewPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceViewPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceViewPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
