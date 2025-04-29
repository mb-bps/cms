import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../_service/user.service';
import { MaterialModule } from '../material.module';
import { ProductUploadPopupComponent } from '../product-upload-popup/product-upload-popup.component';
import { ProductUploadPopupEditComponent } from '../product-upload-popup-edit/product-upload-popup-edit.component';

@Component({
  selector: 'app-products-upload',
  standalone: true,
  imports: [MaterialModule, MatTooltipModule, CommonModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './products-upload.component.html',
  styleUrl: './products-upload.component.css'
})
export class ProductsUploadComponent {
 public jwtToken: any;
  public decode: any;
  public role: any;
  public reqID: any;
  public owner: any;
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private _dialog: MatDialog){
    this.jwtToken = localStorage.getItem('token') as string;
    this.decode = jwtDecode(this.jwtToken) as string;
    this.role = this.decode.role;
    this.reqID = this.decode.requestID;
  }

  ngOnInit(): void {
    this.displayedColumns = [
      'type',
      'booknameEN',
      'authornameEN',
      'isbnnoEN',
      'publishingdateEN',
      'status',
      'action'
    ];

    if (this.role == 'Publishing House (Externel)') {
      this.owner = this.role;
      this.userService.getProductListClient(this.reqID).subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log('Publisher List ', this.dataSource);
        },
        error: console.log,
      });
    }

    if (this.role == 'Reviewer') {
      this.owner = this.role;
      this.userService.getProductList(this.owner).subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log('Reviewer List ', this.dataSource);
        },
        error: console.log,
      });
    }
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

  editRequest($event: any): void {
    console.log('Event = ', $event)
    localStorage.setItem('element', $event.id);
    localStorage.setItem('element1', $event.isbnnoEN);
    const dialogRef = this._dialog.open(ProductUploadPopupEditComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      width: 'auto',
      height: 'auto',
      // enterAnimationDuration,
      // exitAnimationDuration,
    });
    // console.log('ELEMENT ', $event);
    // localStorage.setItem('element', $event);
    dialogRef.disableClose = true;
  }

  newRequest() {
    const dialogRef = this._dialog.open(ProductUploadPopupComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      width: 'auto',
      height: 'auto',
    });
    dialogRef.disableClose = true;
  }
}
