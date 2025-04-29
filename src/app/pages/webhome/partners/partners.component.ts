import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../_service/user.service';
import { PartnerseditComponent } from './partnersedit/partnersedit.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [MaterialModule, MatTooltipModule],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css'
})
export class PartnersComponent {
  public sliderList: any[] = [];
  datasource: any;
  imageURL = environment.homeimageUrl
  displayedColumns: string[] = ["image", "action"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 
  constructor(private userService: UserService, private _dialog: MatDialog){}

  ngOnInit() {
    this.userService.getAllPartners().subscribe(partners => {
      this.sliderList = partners;
      this.datasource = new MatTableDataSource<any>(this.sliderList);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
      console.log('Image URL = ', this.imageURL);
      console.log('Slider List = ', this.sliderList)
    });
  }

    EditForm($event: any): void {
      const dialogRef = this._dialog.open(PartnerseditComponent, {
      });
      localStorage.setItem('element', $event);
      dialogRef.disableClose = true;
    }
  
    openEditForm(event: any){
      event = ''
      
    }
}
