import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../../_service/user.service';
import { MaterialModule } from '../../../material.module';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MainslideraddeditComponent } from '../mainslideraddedit/mainslideraddedit.component';

@Component({
  selector: 'app-mainslider',
  standalone: true,
  imports: [MaterialModule, MatTooltipModule],
  templateUrl: './mainslider.component.html',
  styleUrl: './mainslider.component.css'
})
export class MainsliderComponent {
  public sliderList: any[] = [];
  datasource: any;
  imageURL = environment.sliderimageUrl
  displayedColumns: string[] = ["image", "titleEN", "titleAR", "title1EN", "title1AR", "title2EN", "title2AR", "action"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 
  constructor(private userService: UserService, private _dialog: MatDialog){}

  ngOnInit() {
    this.userService.GetAllSliders().subscribe(sliders => {
      this.sliderList = sliders;
      this.datasource = new MatTableDataSource<any>(this.sliderList);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
      console.log('Image URL = ', this.imageURL);
      console.log('Slider List = ', this.sliderList)
    });
  }

  EditForm($event: any): void {
    const dialogRef = this._dialog.open(MainslideraddeditComponent, {
    });
    localStorage.setItem('element', $event);
    dialogRef.disableClose = true;
  }

  openEditForm(event: any){
    event = ''
    
  }
}
