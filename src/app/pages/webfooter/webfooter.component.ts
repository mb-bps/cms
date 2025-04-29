import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';

@Component({
  selector: 'app-webfooter',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './webfooter.component.html',
  styleUrl: './webfooter.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class WebfooterComponent {
  _response: any;
  public footSource: any;
  public home?: any=[];
  public i?: number;

  form: FormGroup = new FormGroup({
      ministryEN:  new FormControl(''),
      ministryAR: new FormControl(''),
      aboutusEN: new FormControl(''),
      aboutusAR: new FormControl(''),
      categoriesEN:  new FormControl(''),
      categoriesAR: new FormControl(''),
      otherEN:  new FormControl(''),
      otherAR: new FormControl(''),
      disclaimerEN:  new FormControl(''),
      disclaimerAR: new FormControl(''),
      homeEN:  new FormControl(''),
      homeAR: new FormControl(''),
      returnEN: new FormControl(''),
      returnAR: new FormControl(''),
      termsEN:  new FormControl(''),
      termsAR: new FormControl(''),
      privacyEN:  new FormControl(''),
      privacyAR: new FormControl(''),
      faqEN:  new FormControl(''),
      faqAR: new FormControl(''),
      historyEN: new FormControl(''),
      historyAR: new FormControl(''),
      moviesEN:  new FormControl(''),
      moviesAR: new FormControl(''),
      dramaEN:  new FormControl(''),
      dramaAR: new FormControl(''),
      recipeEN:  new FormControl(''),
      recipeAR: new FormControl(''),
      feedbackEN:  new FormControl(''),
      feedbackAR: new FormControl(''),
      // newslatterEN:  new FormControl(''),
      // newslatterAR: new FormControl(''),

    });

constructor(private _fb: FormBuilder, private _userService: UserService, public router: Router, private toastr: ToastrService){
  this.getFooter();
}
getFooter(){
  this._userService.getFooter().subscribe({
    next: (res) => {
      this.footSource = res;
        for(this.i=0; this.i<this.footSource.length; this.i++){
        this.home[this.i] = this.footSource[this.i]; 
        }
        this.form = this._fb.group({
          ministryEN:  this.footSource[0].en,
          ministryAR: this.footSource[0].ar,
          aboutusEN: this.footSource[1].en,
          aboutusAR: this.footSource[1].ar,
          categoriesEN:  this.footSource[2].en,
          categoriesAR: this.footSource[2].ar,
          otherEN:  this.footSource[3].en,
          otherAR: this.footSource[3].ar,
          disclaimerEN:  this.footSource[4].en,
          disclaimerAR: this.footSource[4].ar,
          homeEN:  this.footSource[5].en,
          homeAR: this.footSource[5].ar,
          returnEN:  this.footSource[6].en,
          returnAR: this.footSource[6].ar,
          termsEN:  this.footSource[7].en,
          termsAR: this.footSource[7].ar,
          privacyEN:  this.footSource[8].en,
          privacyAR: this.footSource[8].ar,
          faqEN:  this.footSource[8].en,
          faqAR: this.footSource[8].ar,
          historyEN:  this.footSource[9].en,
          historyAR: this.footSource[9].ar,
          moviesEN:  this.footSource[10].en,
          moviesAR: this.footSource[10].ar,
          dramaEN:  this.footSource[11].en,
          dramaAR: this.footSource[11].ar,
          recipeEN:  this.footSource[12].en,
          recipeAR: this.footSource[12].ar,
          feedbackEN:  this.footSource[13].en,
          feedbackAR: this.footSource[13].ar,
          // newslatterEN:  this.footSource[14].en,
          // newslatterAR: this.footSource[14].ar,

        })
      // console.log('Footer Data = ', this.home);
  }
  })
  }
  
  onSubmit() {
    if(this.form.valid) {
      this._userService.updateFooter(this.form.value).subscribe(res => {
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
