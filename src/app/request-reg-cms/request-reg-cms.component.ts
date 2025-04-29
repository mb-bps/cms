import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { jwtDecode } from 'jwt-decode';
import { MaterialModule } from '../material.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserService } from '../_service/user.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ReqUpdateOwnerStatusComponent } from '../req-update-owner-status/req-update-owner-status.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-request-reg-cms',
  standalone: true,
  imports: [MaterialModule, MatTooltipModule, CommonModule, MatDatepickerModule, MatNativeDateModule ],
  templateUrl: './request-reg-cms.component.html',
  styleUrl: './request-reg-cms.component.css'
})
export class RequestRegCmsComponent {
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
      'request_type',
      'account_type',
      'publisher_nameEN',
      'created_at',
      'current_status',
      'action'
    ];
     
    this.regreqlist();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  regreqlist() {
    if (this.role == 'Reviewer') {
    this.owner = this.role;
    this.userService.getRegReqListReviewer(this.owner).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log('Reviewer List ', this.dataSource);
      },
      error: console.log,
    });
  }

  if (this.role == 'Publishing House (Externel)') {
    this.owner = this.role;
    this.userService.getRegReqListPublisher(this.reqID).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log('Publisher List ', this.dataSource);
      },
      error: console.log,
    });
  }
  }

  editRequest($event: any): void {
    localStorage.setItem('element', $event);
    const dialogRef = this._dialog.open(ReqUpdateOwnerStatusComponent, {
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
  

  InvoiceHistory() {}
}
