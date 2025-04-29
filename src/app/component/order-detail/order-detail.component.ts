import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { orders } from '../../_model/user.model';
import { UserService } from '../../_service/user.service';
import { UserupdateComponent } from '../userupdate/userupdate.component';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {

  orderList!: orders[];
  displayedColumns: string[] = ["isbno_en", "productName_en", "author_en", "quantity", "total", "createdOn", "action"];
  datasource: any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: UserService, private toastr: ToastrService, private dialog: MatDialog,private _cookie: CookieService) {

  }
  ngOnInit(): void {
    this.loadOrderDetails();
  }


  loadOrderDetails() {
    const token = localStorage.getItem("token");
    let decodedToken: any = null;
    if (token) decodedToken = jwtDecode(token);
    let customerId = null;
    if(decodedToken.role != 'admin') {
      customerId = decodedToken.id;
    }
    this.service.getOrderDetail({customerId: customerId}).subscribe(item => {
      item.forEach(x=> {x.createdOn = x.createdOn.split("T")[0]})
      this.orderList = item;
      this.datasource = new MatTableDataSource<orders>(this.orderList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }

  updaterole(code: string) {
    this.Openpopup(code,'role');
  }

  updatestatus(code: string) {
    this.Openpopup(code,'status');
  }

  Openpopup(username: string, type: string) {
    this.dialog.open(UserupdateComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        username: username,
        type: type
      }
    }).afterClosed().subscribe(item=>{
        this.loadOrderDetails();
    })
  }



}