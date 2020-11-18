import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoFacturaComponent } from './listado-factura.component';

describe('ListadoFacturaComponent', () => {
  let component: ListadoFacturaComponent;
  let fixture: ComponentFixture<ListadoFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
