import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_service/user.service';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-req-update-owner-status',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './req-update-owner-status.component.html',
  styleUrl: './req-update-owner-status.component.scss'
})
export class ReqUpdateOwnerStatusComponent {

  public showPassword: boolean = false;
  public companies: any = [];
  public roles: any = [];
  public url: any = '';
  public url1: any = '';
  checkboxState = false;
  public dataSource: any;
  public form: FormGroup;
  public requestid: any;

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  constructor(public fb: FormBuilder, public router: Router, private _userService: UserService, private _dialogRef: DialogRef<ReqUpdateOwnerStatusComponent>,){
    this.form = this.fb.group({
      '_account_type': '',
      '_first_nameEN': '', 
      '_publisher_nameEN': '', 
      '_last_nameEN': '', 
      '_contact_emailEN': '', 
      '_contact_numberEN': '', 
      '_passwordEN': '', 
      '_qid_numberEN': '', 
      '_qid_image': '', 
      '_reg_image': '', 
      '_official_emailEN': '', 
      '_official_contact_numberEN': '', 
      '_official_websiteEN': '', 
      '_legal_registration_documentEN': '', 
      '_license_numberEN': '', 
      '_license_expiry_dateEN': '', 
      '_address_streetEN': '', 
      '_address_cityEN': '', 
      '_address_stateEN': '', 
      '_address_zipEN': '', 
      '_address_countryEN': '', 
      '_additional_notesEN': '', 
      '_first_nameAR': '', 
      '_publisher_nameAR': '', 
      '_last_nameAR': '', 
      '_contact_emailAR': '', 
      '_contact_numberAR': '', 
      '_passwordAR': '', 
      '_qid_numberAR': '', 
      '_official_emailAR': '', 
      '_official_contact_numberAR': '', 
      '_official_websiteAR': '', 
      '_legal_registration_documentAR': '', 
      '_license_numberAR': '',
      '_license_expiry_dateAR': '', 
      '_address_streetAR': '', 
      '_address_cityAR': '', 
      '_address_stateAR': '', 
      '_address_zipAR': '', 
      '_address_countryAR': '', 
      '_additional_notesAR': '', 
      '_status': '', 
      '_acknowledgment': '',      

    });
    this.requestid = localStorage.getItem('element');
    this._userService.getpublisherData(this.requestid).subscribe({
      next: (res) => {
        this.dataSource = res;
        console.log('Publishing House Name = ', this.dataSource[0].publisher_nameEN);
       this.form.setValue({_account_type: this.dataSource[0].account_type, 
        _first_nameEN: this.dataSource[0].first_nameEN,
        _publisher_nameEN: this.dataSource[0].publisher_nameEN,
        _last_nameEN: this.dataSource[0].last_nameEN,
        _contact_emailEN: this.dataSource[0].contact_emailEN,
        _contact_numberEN: this.dataSource[0].contact_numberEN,
        _passwordEN: this.dataSource[0].passwordEN,
        _qid_numberEN: this.dataSource[0].qid_numberEN,
        _qid_image: this.dataSource[0].qid_image,
        _reg_image: this.dataSource[0].reg_image,
        _official_emailEN: this.dataSource[0].official_emailEN,
        _official_contact_numberEN: this.dataSource[0].official_contact_numberEN,
        _official_websiteEN: this.dataSource[0].official_websiteEN,
        _legal_registration_documentEN: this.dataSource[0].legal_registration_documentEN,
        _license_numberEN: this.dataSource[0].license_numberEN,
        _license_expiry_dateEN: this.dataSource[0].license_expiry_dateEN,
        _address_streetEN: this.dataSource[0].address_streetEN,
        _address_cityEN: this.dataSource[0].address_cityEN,
        _address_stateEN: this.dataSource[0].address_stateEN,
        _address_zipEN: this.dataSource[0].address_zipEN,
        _address_countryEN: this.dataSource[0].address_countryEN,
        _additional_notesEN: this.dataSource[0].additional_notesEN,
        
        _first_nameAR: this.dataSource[0].first_nameAR,
        _publisher_nameAR: this.dataSource[0].publisher_nameAR,
        _last_nameAR: this.dataSource[0].last_nameAR,
        _contact_emailAR: this.dataSource[0].contact_emailAR,
        _contact_numberAR: this.dataSource[0].contact_numberAR,
        _passwordAR: this.dataSource[0].passwordAR,
        _qid_numberAR: this.dataSource[0].qid_numberAR,
        _official_emailAR: this.dataSource[0].official_emailAR,
        _official_contact_numberAR: this.dataSource[0].official_contact_numberAR,
        _official_websiteAR: this.dataSource[0].official_websiteAR,
        _legal_registration_documentAR: this.dataSource[0].legal_registration_documentAR,
        _license_numberAR: this.dataSource[0].license_numberAR,
        _license_expiry_dateAR: this.dataSource[0].license_expiry_dateAR,
        _address_streetAR: this.dataSource[0].address_streetAR,
        _address_cityAR: this.dataSource[0].address_cityAR,
        _address_stateAR: this.dataSource[0].address_stateAR,
        _address_zipAR: this.dataSource[0].address_zipAR,
        _address_countryAR: this.dataSource[0].address_countryAR,
        _additional_notesAR: this.dataSource[0].additional_notesAR,
        _status: this.dataSource[0].status,
        _acknowledgment: this.dataSource[0].acknowledgment
      });
      },
     
    });
  }

  ngOnInit() {
    this.url = '../assets/images/Doc.png';
    this.url1 = '../assets/images/QDSNo.png';
  }

  onSubmit() {
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

}
