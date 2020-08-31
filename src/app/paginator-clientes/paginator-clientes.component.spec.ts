import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorClientesComponent } from './paginator-clientes.component';

describe('PaginatorClientesComponent', () => {
  let component: PaginatorClientesComponent;
  let fixture: ComponentFixture<PaginatorClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatorClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
