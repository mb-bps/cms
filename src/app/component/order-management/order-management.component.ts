import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { orders, users } from '../../_model/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserupdateComponent } from '../userupdate/userupdate.component';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css'
})

export class OrderManagementComponent implements OnInit {

  orderList!: orders[];
  displayedColumns: string[] = ["orderNo", "orderStatus", "orderType", "orderTotal", "createdBy", "createdOn", "action"];
  datasource: any;
  public orderno: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  orderDetailLst: any = [];
  @ViewChild("orderDetailModal") orderDetailModal!: TemplateRef<any>;
  @ViewChild("statusDialog") statusDialog!: TemplateRef<any>;
  selectedValue: any;
  status: any;
  statusLst: any[] = [
    { value: 'Pending', name: 'Pending' },
    { value: 'Confirmed', name: 'Confirmed' },
    { value: 'Completed', name: 'Completed' },
  ]

  constructor(private service: UserService, private toastr: ToastrService, private dialog: MatDialog, private _cookie: CookieService) { }

  prdImg: string = environment.prodImages;

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    const token = localStorage.getItem("token");
    let decodedToken: any = null;
    if (token) decodedToken = jwtDecode(token);
    let customerId = null;
    if (decodedToken.role != 'admin' && decodedToken.role != 'Admin') { // add both conditions Upper and Lowar case..
      customerId = decodedToken.requestID;
    }
    this.service.getOrders({ customerId: customerId }).subscribe(item => {
      item.forEach((x: any) => {
        x.createdOn = x.createdOn.split("T")[0],
          x['status'] = "Active";
      })
      this.orderList = item;
      this.datasource = new MatTableDataSource<orders>(this.orderList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }

  email: string = "";
  async getCusEmail(cusId: any){
    this.service.getUserEmail({ id: cusId }).subscribe({
      next: (res) => {
        this.email = res.email;
        this.sendEmail();
      },
      error: (err) => {
        this.toastr.error("Email not sent due to user email not define...!", "Error");
      }
    });
  }

  statusModel: any = {};
  updatestatus(row: any) {
    this.statusModel = row;
    const dialogRef = this.dialog.open(this.statusDialog, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.statusModel = {};
    });
  }

  async sendEmail(){
    this.service.orderStatusEmailService(this.email, this.selectedValue, this.orderno, "en")
    .subscribe({
      next: (res) => {
        this.toastr.success('Email Sent Successfully! Please check your email...!', 'Saved');
      },
      error: (err) => {
        this.toastr.error('Something went wrong while sending the email...!')
      }
    })
  }

  async onUpdateStatus(){
    const copyModel = { 
      id: this.statusModel.orderId,
      status: this.selectedValue,
      orderno: this.statusModel.orderNo
    };
    this.orderno = this.statusModel.orderNo
    this.service.updateOrderStatus(copyModel).subscribe({
      next: (res) => {
        this.getCusEmail(this.statusModel.cusId);
        this.toastr.success("Order Status Updated Successfully, Email Sent Successfully...!", "Success");
        this.loadOrders();
        this.statusModel = {};
        this.dialog.closeAll();
      },
      error: (err) => {
        this.toastr.error("Failed due to: " + err?.error?.message , "Error");
      }
    });
  }

  openOrderDetail(row: any) {
    this.service.getOrderDetailByOrderId(row.orderId).subscribe({
      next: (res) => {
        this.orderDetailLst = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.dialog.open(this.orderDetailModal)
  }

  getTotal(): number {
    return this.orderDetailLst?.reduce((acc: any, item: any) => acc + (item.price * item.quantity), 0);
  }
}