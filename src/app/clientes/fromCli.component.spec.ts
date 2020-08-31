import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromCliComponent } from './fromCli.component';

describe('FromCliComponent', () => {
  let component: FromCliComponent;
  let fixture: ComponentFixture<FromCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
