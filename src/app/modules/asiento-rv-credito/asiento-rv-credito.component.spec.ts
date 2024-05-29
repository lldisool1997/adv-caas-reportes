import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsientoRvCreditoComponent } from './asiento-rv-credito.component';

describe('AsientoRvCreditoComponent', () => {
  let component: AsientoRvCreditoComponent;
  let fixture: ComponentFixture<AsientoRvCreditoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsientoRvCreditoComponent]
    });
    fixture = TestBed.createComponent(AsientoRvCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
