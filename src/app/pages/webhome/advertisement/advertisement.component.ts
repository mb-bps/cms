import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../_service/user.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-advertisement',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MaterialModule],
  templateUrl: './advertisement.component.html',
  styleUrl: './advertisement.component.css'
})
export class AdvertisementComponent {
  public i?: number;
  public home?: any=[];
  public homeSource: any;
  homeImages: any[] = [];
  public img: any = [];
  imageURL = environment.homeimageUrl;
  public url: any = '';
  public data: any[]=[];

      form: FormGroup = new FormGroup({
          en: new FormControl(''),
          ar: new FormControl(''),
          en1: new FormControl(''),
          ar1: new FormControl(''),
    
        });

  constructor(private _fb: FormBuilder, private _userService: UserService){
    this.getHome();
    this.gethomeImages();
  }

  gethomeImages() {
    this._userService.getHomeImages().subscribe({
      next: (res) => {
      this.homeImages = res;
      for(this.i=0; this.i<this.homeImages.length; this.i++){
        this.img[this.i] = this.homeImages[this.i].image; 
        }
        this.url = this.imageURL+this.img[3];
      console.log('Home Images = ', this.url)
    }
  })
  }

  getHome(){
    this._userService.getHome().subscribe({
      next: (res) => {
        this.homeSource = res;
          for(this.i=0; this.i<this.homeSource.length; this.i++){
          this.home[this.i] = this.homeSource[this.i] 
          }
          this.form = this._fb.group({
            en:  this.homeSource[17].en,
            ar: this.homeSource[17].ar,
            en1: this.homeSource[18].en,
            ar1: this.homeSource[18].ar,
          })
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
  
  }
}
