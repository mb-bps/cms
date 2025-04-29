import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import { Router, RouterLink } from '@angular/router';
import { TabhomeComponent } from "../tabs/tabhome/tabhome.component";
import { CommonModule } from '@angular/common';
import { WebheaderComponent } from "../pages/webheader/webheader.component";
import { WebfooterComponent } from "../pages/webfooter/webfooter.component";

@Component({
  selector: 'app-frontend',
  standalone: true,
  imports: [MaterialModule, TabhomeComponent, CommonModule, WebheaderComponent, WebfooterComponent],
  templateUrl: './frontend.component.html',
  styleUrl: './frontend.component.css'
})
export class FrontendComponent {
  public link: any;
public pages: any = ['Home', 'Header', 'Footer']

  constructor(private router: Router,){}
  onChange(event: any) {
    // console.log('Event Value = ', event.value)
    if (event.value == 'Home') {
      this.link = 'Home';
  }
  if (event.value == 'Header') {
    this.link = 'Header';
}
if (event.value == 'Footer') {
  this.link = 'Footer';
}
  
  }
}
