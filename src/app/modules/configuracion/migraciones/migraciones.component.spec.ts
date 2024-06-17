import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigracionesComponent } from './migraciones.component';

describe('MigracionesComponent', () => {
  let component: MigracionesComponent;
  let fixture: ComponentFixture<MigracionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MigracionesComponent]
    });
    fixture = TestBed.createComponent(MigracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
