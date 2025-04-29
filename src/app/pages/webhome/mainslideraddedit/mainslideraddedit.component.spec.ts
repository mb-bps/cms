import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainslideraddeditComponent } from './mainslideraddedit.component';

describe('MainslideraddeditComponent', () => {
  let component: MainslideraddeditComponent;
  let fixture: ComponentFixture<MainslideraddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainslideraddeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainslideraddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
