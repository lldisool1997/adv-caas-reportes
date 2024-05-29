import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarAsientoRCComponent } from './enviar-asiento-rc.component';

describe('EnviarAsientoRCComponent', () => {
  let component: EnviarAsientoRCComponent;
  let fixture: ComponentFixture<EnviarAsientoRCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnviarAsientoRCComponent]
    });
    fixture = TestBed.createComponent(EnviarAsientoRCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
