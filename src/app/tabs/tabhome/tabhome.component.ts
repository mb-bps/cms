import { Component, OnInit } from '@angular/core';
import { TabsComponent } from "../../reuseable/tabs/tabs.component";
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { MainsliderComponent } from "../../pages/webhome/mainslider/mainslider.component";
import { AboutusComponent } from "../../pages/webhome/aboutus/aboutus.component";
import { FeaturedimageComponent } from "../../pages/webhome/featuredimage/featuredimage.component";
import { BuynowComponent } from "../../pages/webhome/buynow/buynow.component";
import { PartnersComponent } from "../../pages/webhome/partners/partners.component";
import { AdvertisementComponent } from "../../pages/webhome/advertisement/advertisement.component";

@Component({
  selector: 'app-tabhome',
  standalone: true,
  imports: [TabsComponent, CommonModule, MaterialModule, MainsliderComponent, AboutusComponent, FeaturedimageComponent, BuynowComponent, PartnersComponent, AdvertisementComponent],
  templateUrl: './tabhome.component.html',
  styleUrl: './tabhome.component.css'
})
export class TabhomeComponent implements OnInit{
  tabs: string [] = ['Main Slider','About Us', 'Featured Image', 'Buy Now', 'Partners', 'Place Adv.'];
  activatedTabIndex: number = 0;

  ngOnInit(): void {
  }
  tabChange(tabIndex: number) {
    this.activatedTabIndex = tabIndex;
  }

}
