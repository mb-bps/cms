import { Component } from '@angular/core';
import { ProductsUploadComponent } from "../products-upload/products-upload.component";

@Component({
  selector: 'app-products-request',
  standalone: true,
  imports: [ProductsUploadComponent],
  templateUrl: './products-request.component.html',
  styleUrl: './products-request.component.css'
})
export class ProductsRequestComponent {

}
