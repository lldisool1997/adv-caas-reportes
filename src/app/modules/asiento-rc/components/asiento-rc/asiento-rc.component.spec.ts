import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsientoRcComponent } from './asiento-rc.component';

describe('AsientoRcComponent', () => {
  let component: AsientoRcComponent;
  let fixture: ComponentFixture<AsientoRcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsientoRcComponent]
    });
    fixture = TestBed.createComponent(AsientoRcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
