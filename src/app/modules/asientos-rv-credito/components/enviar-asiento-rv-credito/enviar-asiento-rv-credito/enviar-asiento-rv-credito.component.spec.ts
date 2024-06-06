import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarAsientoRvCreditoComponent } from './enviar-asiento-rv-credito.component';

describe('EnviarAsientoRvCreditoComponent', () => {
  let component: EnviarAsientoRvCreditoComponent;
  let fixture: ComponentFixture<EnviarAsientoRvCreditoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnviarAsientoRvCreditoComponent]
    });
    fixture = TestBed.createComponent(EnviarAsientoRvCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
