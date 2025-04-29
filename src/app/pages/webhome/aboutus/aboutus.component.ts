import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../_service/user.service';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AboutusComponent {
  _response: any;
  public homeSource: any;
  public home?: any=[];
  public i?: number;

  form: FormGroup = new FormGroup({
      titleEN: new FormControl(''),
      titleAR: new FormControl(''),
      contentEN: new FormControl(''),
      contentAR: new FormControl('')

    });

constructor(private _fb: FormBuilder, private _userService: UserService, public router: Router, private toastr: ToastrService){
  this.getHome();
}

getHome(){
this._userService.getHome().subscribe({
  next: (res) => {
    this.homeSource = res;
      for(this.i=0; this.i<this.homeSource.length; this.i++){
      this.home[this.i] = this.homeSource[this.i]; 
      }
      this.form = this._fb.group({
        titleEN:  this.homeSource[0].en,
        titleAR: this.homeSource[0].ar,
        contentEN: this.homeSource[1].en,
        contentAR: this.homeSource[1].ar
      })
    console.log('Home Data = ', this.home[0]);
}
})
}

onSubmit() {
  if(this.form.valid) {
    this._userService.updateAboutus(this.form.value).subscribe(res => {
      this._response = res;
      if (this._response.result === 'pass') {
        this.toastr.success('Updated Successfully', 'Success');
      } else {
        this.toastr.error('Due to:' + this._response.message, 'Failed');
      }
      console.log(this.form.value);
    });

  }
}
}