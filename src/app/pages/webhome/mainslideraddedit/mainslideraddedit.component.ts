import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../../_service/customer.service';
import { UserService } from '../../../_service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-mainslideraddedit',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './mainslideraddedit.component.html',
  styleUrl: './mainslideraddedit.component.scss'
})
export class MainslideraddeditComponent {

  public sid: any;
  isSignUpFailed = false;
  errorMessage = '';
  imageURL = environment.sliderimageUrl
  detailForm: FormGroup = new FormGroup({
    image: new FormControl(''),
    titleEN: new FormControl(''),
    titleAR: new FormControl(''),
    title1EN: new FormControl(''),
    title1AR: new FormControl(''),
    title2EN: new FormControl(''),
    title2AR: new FormControl('')
  });
  public dataSource: any = null;
  public data: any;
  public url: any = ''  

  constructor(private _dialogRef: DialogRef<MainslideraddeditComponent>, private _fb: FormBuilder, private _userService: UserService, public router: Router) {
  }

  ngOnInit(): void {
    this.sid = localStorage.getItem('element');
    this._userService.FindSliders(this.sid).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.data = this.dataSource._data._value;
      // console.log('Detail Form ', this.data[0].image);
      this.detailForm = this._fb.group({
        image:  this.data[0].image,
        titleEN: this.data[0].titleEN,
        titleAR: this.data[0].titleAR,
        title1EN: this.data[0].title1EN,
        title1AR: this.data[0].title1AR,
        title2EN: this.data[0].title1EN,
        title2AR: this.data[0].title1AR
    })
    this.url = this.imageURL+this.data[0].image;
  }
    });
    // console.log('Detail Form =', this.data[0].image);
  }

  onSubmit() {
    
    this.detailForm.reset();
    localStorage.removeItem('element');
    this._dialogRef.close();
  }

  onCancel() {
    this.detailForm.reset();
    localStorage.removeItem('element');
    this._dialogRef.close();
  }

  onSelectFile(e: any) {
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event: any)=>{
      this.url=event.target.result;  
      }
    }
  }

    onClose() {
      localStorage.removeItem('element');
      this._dialogRef.close();
    }
}
