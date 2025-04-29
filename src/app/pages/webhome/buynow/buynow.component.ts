import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../_service/user.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-buynow',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, CommonModule],
  templateUrl: './buynow.component.html',
  styleUrl: './buynow.component.css'
})
export class BuynowComponent {
  imageURL = environment.homeimageUrl;

  public dataSource: any[] = [];
  public data: any[]=[];
  public url: any = '';
  public i: number=0;

    public homeSource: any;
    public home?: any=[];
  
    form: FormGroup = new FormGroup({
        en: new FormControl(''),
        ar: new FormControl(''),
        en1: new FormControl(''),
        ar1: new FormControl(''),
  
      });
  
  constructor(private _fb: FormBuilder, private _userService: UserService, public router: Router){
    this.getHome();
  }

  ngOnInit(): void {
    this._userService.getHomeImages().subscribe({
      next: (res) => {
        this.dataSource = res;
      for (this.i=0; this.i< this.dataSource.length; this.i++) {
        this.data[this.i] = this.dataSource[this.i]
      }
    this.url = this.imageURL+this.data[1].image;
    console.log('Featured Image =', this.url);
  }
    });
  }

  getHome(){
    this._userService.getHome().subscribe({
      next: (res) => {
        this.homeSource = res;
          for(this.i=0; this.i<this.homeSource.length; this.i++){
          this.home[this.i] = this.homeSource[this.i]; 
          }
          this.form = this._fb.group({
            en:  this.homeSource[10].en,
            ar: this.homeSource[10].ar,
            en1:  this.homeSource[11].en,
            ar1: this.homeSource[11].ar,

          })
        // console.log('Home Data = ', this.home[10]);
    }
    })
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

  onSubmit() {
    // if(this.form.get('role')?.value == '1') {
    // this.form.patchValue({roles: this.user});
    // }
  
  }
}
