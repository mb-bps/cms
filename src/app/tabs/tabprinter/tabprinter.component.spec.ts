import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabprinterComponent } from './tabprinter.component';

describe('TabprinterComponent', () => {
  let component: TabprinterComponent;
  let fixture: ComponentFixture<TabprinterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabprinterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabprinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
