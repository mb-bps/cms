import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../_service/user.service';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-featuredimage',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './featuredimage.component.html',
  styleUrl: './featuredimage.component.css'
})
export class FeaturedimageComponent {
  imageURL = environment.homeimageUrl;

  public dataSource: any[] = [];
  public data: any[]=[];
  public url: any = '';
  public i: number=0;
  _response: any;
  public name: string = '';
  public image: any;
  
  constructor(private _fb: FormBuilder, private _userService: UserService, public router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
    this._userService.getHomeImages().subscribe({
      next: (res) => {
        this.dataSource = res;
      for (this.i=0; this.i< this.dataSource.length; this.i++) {
        this.data[this.i] = this.dataSource[this.i]
      }
    
    this.url = this.imageURL+this.data[0].image;
    this.name = this.data[0].name;
    console.log('Featured Image =', this.url);
  }
    });
  }

  onSelectFile(e: any) {
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.image = e.target.files[0];
      reader.onload=(event: any)=>{
      this.url=event.target.result;  
      }
    }
  }

  onSubmit() {
    debugger
      const formData: any = new FormData();
      formData.append('image', this.image);
      this._userService.updateFeaturedImage(formData).subscribe(res => {
        this._response = res;
        if (this._response.result === 'pass') {
          this.toastr.success('Updated Successfully', 'Success');
    }
  });
  }
}

