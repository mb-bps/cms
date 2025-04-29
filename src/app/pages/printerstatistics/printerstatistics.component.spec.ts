import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterstatisticsComponent } from './printerstatistics.component';

describe('PrinterstatisticsComponent', () => {
  let component: PrinterstatisticsComponent;
  let fixture: ComponentFixture<PrinterstatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrinterstatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrinterstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
