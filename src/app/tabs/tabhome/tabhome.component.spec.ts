import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabhomeComponent } from './tabhome.component';

describe('TabhomeComponent', () => {
  let component: TabhomeComponent;
  let fixture: ComponentFixture<TabhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabhomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
