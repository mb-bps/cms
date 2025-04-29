import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialModule } from '../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../_service/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-product-upload-popup-edit',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './product-upload-popup-edit.component.html',
  styleUrl: './product-upload-popup-edit.component.scss'
})
export class ProductUploadPopupEditComponent {
  jwtToken: any;
  decode: any;
  public roles: any = [];
  public url: any = '';
  public url1: any = '';
  public url2: any = '';
  checkboxState = false;
  public dataSource: any;
  public _data: any;
  public catSource: any;
  public form: FormGroup;
  public requestid: any;
  public isbnnoEN: any;
  public onChangeEN: any;
  public onChangeAR: any;
  public bookimage: any = null;
  public titleimage: any = null;
  public previewimage: any = null;
  _response: any;
  public print: any = '';
  public stats: any = '';

  constructor(public fb: FormBuilder, public router: Router, private _userService: UserService, private _dialogRef: DialogRef<ProductUploadPopupEditComponent>){
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

    this.requestid = localStorage.getItem('element');
    this.isbnnoEN = localStorage.getItem('element1')
    this._userService.getProductEditData(this.requestid, this.isbnnoEN).subscribe({
      next: (res) => {
        debugger
        this.dataSource = res;
        console.log('This dataSource123 = ', this.dataSource)
       this.form.setValue({_catidEN: this.dataSource[0].catidEN, 
        _catidAR: this.dataSource[0].catidAR,
        _booknameEN: this.dataSource[0].booknameEN,
        _booknameAR: this.dataSource[0].booknameAR,
        _booktitleEN: this.dataSource[0].booktitleEN,
        _booktitleAR: this.dataSource[0].booktitleAR,
        _bookpreviewEN: this.dataSource[0].bookpreviewEN,
        _bookpreviewAR: this.dataSource[0].bookpreviewAR,
        _authornameEN: this.dataSource[0].authornameEN,
        _authornameAR: this.dataSource[0].authornameAR,
        _booklanguageEN: this.dataSource[0].booklanguageEN,
        _booklanguageAR: this.dataSource[0].booklanguageAR,
        _bookpagesEN: this.dataSource[0].bookpagesEN,
        _bookpagesAR: this.dataSource[0].bookpagesAR,
        _isbnnoEN: this.dataSource[0].isbnnoEN,
        _isbnnoAR: this.dataSource[0].isbnnoAR,
        _publishingyearEN: this.dataSource[0].publishingyearEN,
        _publishingyearAR: this.dataSource[0].publishingyearAR,
        _publishingdateEN: moment(this.dataSource[0].publishingdateEN).format("MM/DD/YYYY"),
        _publishingdateAR: moment(this.dataSource[0].publishingdateAR).format("MM/DD/YYYY"),
        _ldnumberEN: this.dataSource[0].ldnumberEN,
        _ldnumberAR: this.dataSource[0].ldnumberAR,
        _bookdescEN: this.dataSource[0].bookdescEN,
        _bookdescAR: this.dataSource[0].bookdescAR,
        _isprinting: this.dataSource[0].isprinting,
        _image: this.dataSource[0].image,
        _pdf: this.dataSource[0].pdf,
        _pdf1: this.dataSource[0].pdf1,
        _priceEN: this.dataSource[0].priceEN,
        _priceAR: this.dataSource[0].priceAR,
        _client_id: this.dataSource[0].client_id,
        _client_type: this.dataSource[0].client_type,
        _type: this.dataSource[0].type,
        // _status: this.dataSource[0].status
      });
      this.stats = this.dataSource[0].status;
      console.log('date = ', this.form.value._publishingdateEN)
    },
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

  onCatChangeEN($event: any) {
    this.onChangeEN = $event.value;
    // console.log('Selected Value ', this.onChange);
   }

   onCatChangeAR($event: any) {
    this.onChangeAR = $event.value;
    // console.log('Selected Value ', this.onChange);
   }

   onSubmit(){
    this._data = this.dataSource[0];
    this._userService.productApprovedUpdate(this.requestid, this.isbnnoEN, this._data).subscribe({
      next: (res) => {
        localStorage.removeItem('element');
        localStorage.removeItem('element1');
        this._dialogRef.close();
   }
  });
   }

   return() {
    localStorage.removeItem('element');
    localStorage.removeItem('element1');
    this._dialogRef.close();
   }

   reject() {
    localStorage.removeItem('element');
    localStorage.removeItem('element1');
    this._dialogRef.close();
   }

}
