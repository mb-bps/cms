import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRegCmsComponent } from './request-reg-cms.component';

describe('RequestRegCmsComponent', () => {
  let component: RequestRegCmsComponent;
  let fixture: ComponentFixture<RequestRegCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestRegCmsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestRegCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
