import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerseditComponent } from './partnersedit.component';

describe('PartnerseditComponent', () => {
  let component: PartnerseditComponent;
  let fixture: ComponentFixture<PartnerseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerseditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnerseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
