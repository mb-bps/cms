import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaterialModule } from '../material.module';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-product-upload-popup',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './product-upload-popup.component.html',
  styleUrl: './product-upload-popup.component.scss'
})
export class ProductUploadPopupComponent {
  jwtToken: any;
  decode: any;
  public roles: any = [];
  public url: any = '';
  public url1: any = '';
  public url2: any = '';
  checkboxState = false;
  public dataSource: any;
  public catSource: any;
  public form: FormGroup;
  public requestid: any;
  public onChangeEN: any;
  public onChangeAR: any;
  public bookimage: any = null;
  public titleimage: any = null;
  public previewimage: any = null;
  _response: any;
  public print: any = ''
  
    constructor(public fb: FormBuilder, public router: Router, private _userService: UserService, private _dialogRef: DialogRef<ProductUploadPopupComponent>, private toastr: ToastrService){
      this.jwtToken = localStorage.getItem('token') as string;
      this.decode = jwtDecode(this.jwtToken) as string;
      this._userService.getAllCategories().subscribe({
        next: (res) => {
        this.catSource = res;
        console.log('Categories = ', this.catSource);
        }
      });
      this.form = this.fb.group({
        '_catidEN': '',
        '_catidAR': '',
        '_booknameEN': '', 
        '_booknameAR': '', 
        '_booktitleEN': '', 
        '_booktitleAR': '', 
        '_bookpreviewEN': '', 
        '_bookpreviewAR': '', 
        '_authornameEN': '', 
        '_authornameAR': '', 
        '_booklanguageEN': '', 
        '_booklanguageAR': '', 
        '_bookpagesEN': '', 
        '_bookpagesAR': '', 
        '_isbnnoEN': '', 
        '_isbnnoAR': '', 
        '_publishingyearEN': '', 
        '_publishingyearAR': '', 
        '_publishingdateEN': '', 
        '_publishingdateAR': '', 
        '_ldnumberEN': '', 
        '_ldnumberAR': '', 
        '_bookdescEN': '', 
        '_bookdescAR': '', 
        '_isprinting': 0, 
        '_image': '', 
        '_pdf': '', 
        '_pdf1': '', 
        '_priceEN': '',
        '_priceAR': '',
        '_client_id': '',
        '_client_type': 'Publishing House',
        '_type': 'Book Uploading'
      });
    }

    ngOnInit() {
      this.url = '../assets/images/pdf.png';
      this.url1 = '../assets/images/image.png';
      this.url2 = '../assets/images/pdf.png';

    }

    onSelectFile(e: any) {
      if(e.target.files){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        this.bookimage = e.target.files[0];
        reader.onload=(event: any)=>{
        // this.url=event.target.result;  
        }
      }
    }

    onSelectFile1(e: any) {
      if(e.target.files){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        this.titleimage = e.target.files[0];
        reader.onload=(event: any)=>{
        this.url1=event.target.result;  
        }
      }
    }

    onSelectFile2(e: any) {
      if(e.target.files){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        this.previewimage = e.target.files[0];
        reader.onload=(event: any)=>{
        // this.url2=event.target.result;  
        }
      }
    }

    onSubmit() {
      debugger
      if(this.form.value.isprinting = false) {
        this.print = 0;
      }
      if(this.form.value.isprinting = true) {
        this.print = 1;
      }

      if(this.form.valid && this.bookimage != null && this.titleimage != null && this.previewimage != null) {
      const formData: any = new FormData();
      formData.append('bookimage', this.bookimage);
      formData.append('titleimage', this.titleimage);
      formData.append('previewimage', this.previewimage);
      formData.append('booknameEN', this.form.value._booknameEN),
      formData.append('booknameAR', this.form.value._booknameAR),
      formData.append('booktitleEN', this.form.value._booktitleEN),
      formData.append('booktitleAR', this.form.value._booktitleAR),
      formData.append('bookpreviewEN', this.form.value._bookpreviewEN),
      formData.append('bookpreviewAR', this.form.value._bookpreviewAR),
      formData.append('authornameEN', this.form.value._authornameEN),
      formData.append('authornameAR', this.form.value._authornameAR),
      formData.append('catidEN', this.form.value._catidEN),
      formData.append('catidAR', this.form.value._catidAR),
      formData.append('booklanguageEN', this.form.value._booklanguageEN),
      formData.append('booklanguageAR', this.form.value._booklanguageAR),
      formData.append('bookpagesEN', this.form.value._bookpagesEN),
      formData.append('bookpagesAR', this.form.value._bookpagesAR),
      formData.append('priceEN', this.form.value._priceEN),
      formData.append('priceAR', this.form.value._priceAR),
      formData.append('isbnnoEN', this.form.value._isbnnoEN),
      formData.append('isbnnoAR', this.form.value._isbnnoAR),
      formData.append('publishingyearEN', this.form.value._publishingyearEN),
      formData.append('publishingyearAR', this.form.value._publishingyearAR),
      formData.append('publishingdateEN', this.form.value._publishingdateEN),
      formData.append('publishingdateAR', this.form.value._publishingdateAR),
      formData.append('ldnumberEN', this.form.value._ldnumberEN),
      formData.append('ldnumberAR', this.form.value._ldnumberAR),
      formData.append('bookdescEN', this.form.value._bookdescEN),
      formData.append('bookdescAR', this.form.value._bookdescAR),
      formData.append('isprinting', this.print),
      formData.append('status', 'New'),
      formData.append('owner', 'Reviewer'),
      formData.append('client_id', this.decode.requestID),
      formData.append('client_type', 'Publishing House'),
      formData.append('type', 'Book Uploading'),
      this._userService.uploadProduct(formData).subscribe(res => {
        this._response = res;
        if (this._response.result === 'pass') {
          this.toastr.success('Updated Successfully', 'Success');
    }   else {
          this.toastr.error('Somthing went wrong!');
    }
  });
    } else {
          this.toastr.warning('Please fill all fields and images');
}
    }

    cancel() {
      localStorage.removeItem('element');
      this._dialogRef.close();
    }
  
    return() {
      localStorage.removeItem('element');
      this._dialogRef.close();
    }
  
    reject() {
      localStorage.removeItem('element');
      this._dialogRef.close();
    }

    onCatChangeEN($event: any) {
      this.onChangeEN = $event.value;
      // console.log('Selected Value ', this.onChange);
     }

     onCatChangeAR($event: any) {
      this.onChangeAR = $event.value;
      // console.log('Selected Value ', this.onChange);
     }

}
