import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUploadPopupComponent } from './product-upload-popup.component';

describe('ProductUploadPopupComponent', () => {
  let component: ProductUploadPopupComponent;
  let fixture: ComponentFixture<ProductUploadPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUploadPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductUploadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
