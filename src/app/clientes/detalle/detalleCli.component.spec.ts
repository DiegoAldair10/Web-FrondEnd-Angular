import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCliComponent } from './detalleCli.component';

describe('DetalleCliComponent', () => {
  let component: DetalleCliComponent;
  let fixture: ComponentFixture<DetalleCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
