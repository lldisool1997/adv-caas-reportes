import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsAsientosRvRcComponent } from './logs-asientos-rv-rc.component';

describe('LogsAsientosRvRcComponent', () => {
  let component: LogsAsientosRvRcComponent;
  let fixture: ComponentFixture<LogsAsientosRvRcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogsAsientosRvRcComponent]
    });
    fixture = TestBed.createComponent(LogsAsientosRvRcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
