import { Component } from '@angular/core';
import { MaterialModule } from '../../../../material.module';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../../../_service/user.service';
import { MainslideraddeditComponent } from '../../mainslideraddedit/mainslideraddedit.component';
import { environment } from '../../../../../environments/environment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-partnersedit',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './partnersedit.component.html',
  styleUrl: './partnersedit.component.css'
})
export class PartnerseditComponent {
public url: any = ''
imageURL = environment.homeimageUrl;
public data: any;
public dataSource: any = null;
public sid: any;

  detailForm: FormGroup = new FormGroup({
    image: new FormControl(''),
  });

constructor(private _dialogRef: DialogRef<PartnerseditComponent>, private _fb: FormBuilder, private _userService: UserService, public router: Router){}

ngOnInit(): void {
  this.sid = localStorage.getItem('element');
      this._userService.FindPartners(this.sid).subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.data = this.dataSource._data._value;
        // console.log('Detail Form ', this.data[0].image);
        this.detailForm = this._fb.group({
          image:  this.data[0].image,
      })
      this.url = this.imageURL+this.data[0].image;
      console.log('URL = ', this.url)
    }
      });
}

  onSubmit() {
    localStorage.removeItem('element');
    this._dialogRef.close();
  }

  onCancel() {
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
