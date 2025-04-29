import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqUpdateOwnerStatusComponent } from './req-update-owner-status.component';

describe('ReqUpdateOwnerStatusComponent', () => {
  let component: ReqUpdateOwnerStatusComponent;
  let fixture: ComponentFixture<ReqUpdateOwnerStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReqUpdateOwnerStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReqUpdateOwnerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
