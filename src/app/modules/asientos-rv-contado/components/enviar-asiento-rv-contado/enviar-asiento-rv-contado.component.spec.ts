import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarAsientoRvContadoComponent } from './enviar-asiento-rv-contado.component';

describe('EnviarAsientoRvContadoComponent', () => {
  let component: EnviarAsientoRvContadoComponent;
  let fixture: ComponentFixture<EnviarAsientoRvContadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnviarAsientoRvContadoComponent]
    });
    fixture = TestBed.createComponent(EnviarAsientoRvContadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
