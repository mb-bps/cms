import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsRequestComponent } from './products-request.component';

describe('ProductsRequestComponent', () => {
  let component: ProductsRequestComponent;
  let fixture: ComponentFixture<ProductsRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
