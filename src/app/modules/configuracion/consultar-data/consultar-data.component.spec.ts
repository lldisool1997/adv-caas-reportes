import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarDataComponent } from './consultar-data.component';

describe('ConsultarDataComponent', () => {
  let component: ConsultarDataComponent;
  let fixture: ComponentFixture<ConsultarDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarDataComponent]
    });
    fixture = TestBed.createComponent(ConsultarDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
