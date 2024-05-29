import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsientoRvContadoComponent } from './asiento-rv-contado.component';

describe('AsientoRvContadoComponent', () => {
  let component: AsientoRvContadoComponent;
  let fixture: ComponentFixture<AsientoRvContadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsientoRvContadoComponent]
    });
    fixture = TestBed.createComponent(AsientoRvContadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
