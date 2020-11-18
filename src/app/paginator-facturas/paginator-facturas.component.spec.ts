import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorFacturasComponent } from './paginator-facturas.component';

describe('PaginatorFacturasComponent', () => {
  let component: PaginatorFacturasComponent;
  let fixture: ComponentFixture<PaginatorFacturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatorFacturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
