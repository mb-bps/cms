import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUploadPopupEditComponent } from './product-upload-popup-edit.component';

describe('ProductUploadPopupEditComponent', () => {
  let component: ProductUploadPopupEditComponent;
  let fixture: ComponentFixture<ProductUploadPopupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUploadPopupEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductUploadPopupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
