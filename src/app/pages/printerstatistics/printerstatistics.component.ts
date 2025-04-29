import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';

@Component({
  selector: 'app-printerstatistics',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './printerstatistics.component.html',
  styleUrl: './printerstatistics.component.css'
})
export class PrinterstatisticsComponent {
  _response: any;
  public footSource: any;
  public home?: any=[];
  public i?: number;

  form: FormGroup = new FormGroup({
      printerstatusEN:  new FormControl(''),
      printerstatusAR: new FormControl(''),
      jobidEN: new FormControl(''),
      jobidAR: new FormControl(''),
      jobstatusEN:  new FormControl(''),
      jobstatusAR: new FormControl(''),
      lastjobEN:  new FormControl(''),
      lastjobAR: new FormControl(''),
      cyanEN:  new FormControl(''),
      cyanAR: new FormControl(''),
      magentaEN:  new FormControl(''),
      magentaAR: new FormControl(''),
      blackEN: new FormControl(''),
      blackAR: new FormControl(''),
      yellowEN:  new FormControl(''),
      yellowAR: new FormControl(''),
      totalinkEN:  new FormControl(''),
      totalinkAR: new FormControl(''),
      tonerstatusEN:  new FormControl(''),
      tonerstatusAR: new FormControl(''),
      papercapacityEN: new FormControl(''),
      papercapacityAR: new FormControl(''),
      remainingpapertr1EN:  new FormControl(''),
      remainingpapertr1AR: new FormControl(''),
      remainingpapertr2EN:  new FormControl(''),
      remainingpapertr2AR: new FormControl(''),
      papersizetr1EN:  new FormControl(''),
      papersizetr1AR: new FormControl(''),
      papersizetr2EN:  new FormControl(''),
      papersizetr2AR: new FormControl(''),
      printmodeEN:  new FormControl(''),
      printmodeAR: new FormControl(''),
      printspeedEN:  new FormControl(''),
      printspeedAR: new FormControl(''),
      sheetprintedEN:  new FormControl(''),
      sheetprintedAR: new FormControl(''),
      printdurationEN:  new FormControl(''),
      printdurationAR: new FormControl(''),
      noofjobsEN:  new FormControl(''),
      noofjobsAR: new FormControl(''),

    });
    constructor(private _fb: FormBuilder, private _userService: UserService, public router: Router, private toastr: ToastrService){
      this.getPrintStats();
    }
    
    getPrintStats(){
      this._userService.getPrintStats().subscribe({
        next: (res) => {
          this.footSource = res;
            this.form = this._fb.group({
              printerstatusEN:  this.footSource[0].printerstatusEN,
              printerstatusAR:  this.footSource[0].printerstatusAR,
              jobidEN: this.footSource[0].jobidEN,
              jobidAR: this.footSource[0].jobidAR,
              jobstatusEN:  this.footSource[0].jobstatusEN,
              jobstatusAR: this.footSource[0].jobstatusAR,
              lastjobEN:  this.footSource[0].lastjobEN,
              lastjobAR: this.footSource[0].lastjobAR,
              cyanEN:  this.footSource[0].cyanEN,
              cyanAR: this.footSource[0].cyanAR,
              magentaEN:  this.footSource[0].magentaEN,
              magentaAR: this.footSource[0].magentaAR,
              blackEN: this.footSource[0].blackEN,
              blackAR: this.footSource[0].blackAR,
              yellowEN:  this.footSource[0].yellowEN,
              yellowAR: this.footSource[0].yellowAR,
              totalinkEN:  this.footSource[0].totalinkEN,
              totalinkAR: this.footSource[0].totalinkAR,
              tonerstatusEN:  this.footSource[0].tonerstatusEN,
              tonerstatusAR: this.footSource[0].tonerstatusAR,
              papercapacityEN: this.footSource[0].papercapacityEN,
              papercapacityAR: this.footSource[0].papercapacityAR,
              remainingpapertr1EN:  this.footSource[0].remainingpapertr1EN,
              remainingpapertr1AR: this.footSource[0].remainingpapertr1AR,
              remainingpapertr2EN:  this.footSource[0].remainingpapertr2EN,
              remainingpapertr2AR: this.footSource[0].remainingpapertr2AR,
              papersizetr1EN:  this.footSource[0].papersizetr1EN,
              papersizetr1AR: this.footSource[0].papersizetr1AR,
              papersizetr2EN:  this.footSource[0].papersizetr2EN,
              papersizetr2AR: this.footSource[0].papersizetr2AR,
              printmodeEN:  this.footSource[0].printmodeEN,
              printmodeAR: this.footSource[0].printmodeAR,
              printspeedEN:  this.footSource[0].printspeedEN,
              printspeedAR: this.footSource[0].printspeedAR,
              sheetprintedEN:  this.footSource[0].sheetprintedEN,
              sheetprintedAR: this.footSource[0].sheetprintedAR,
              printdurationEN:  this.footSource[0].printdurationEN,
              printdurationAR: this.footSource[0].printdurationAR,
              noofjobsEN:  this.footSource[0].noofjobsEN,
              noofjobsAR: this.footSource[0].noofjobsAR,             
    
            })
      }
      })
      }

    onSubmit() {
      if(this.form.valid) {
        this._userService.updatePrintStatistics(this.form.value).subscribe(res => {
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
