import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ConfirmotpComponent } from './component/confirmotp/confirmotp.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgetpasswordComponent } from './component/forgetpassword/forgetpassword.component';
import { UpdatepasswordComponent } from './component/updatepassword/updatepassword.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { CustomerComponent } from './component/customer/customer.component';
import { UserComponent } from './component/user/user.component';
import { authGuard } from './_guard/auth.guard';
import { UserroleComponent } from './component/userrole/userrole.component';
import { AddcustomerComponent } from './component/addcustomer/addcustomer.component';
import { FrontendComponent } from './frontend/frontend.component';
import { TabhomeComponent } from './tabs/tabhome/tabhome.component';
import { RequestsComponent } from './requests/requests.component';
import { ProductsRequestComponent } from './products-request/products-request.component';
import { OrderManagementComponent } from './component/order-management/order-management.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { TabprinterComponent } from './tabs/tabprinter/tabprinter.component';

export const routes: Routes = [
    {path:'',component:HomeComponent,canActivate:[authGuard]},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'confirmotp',component:ConfirmotpComponent},
    {path:'forgetpassword',component:ForgetpasswordComponent},
    {path:'updatepassword/:token',component:UpdatepasswordComponent},
    // {path:'resetpassword',component:ResetpasswordComponent,canActivate:[authGuard]},
    {path:'customer',component:CustomerComponent,canActivate:[authGuard]},
    {path:'customer/add',component:AddcustomerComponent,canActivate:[authGuard]},
    {path:'customer/edit/:code',component:AddcustomerComponent,canActivate:[authGuard]},
    {path:'Users',component:UserComponent,canActivate:[authGuard]},
    {path:'Order Management',component:OrderManagementComponent,canActivate:[authGuard]},
    {path:'Order Detail Management',component:OrderDetailComponent, canActivate:[authGuard]},
    {path:'Role',component:UserroleComponent, canActivate:[authGuard]},
    {path:'Frontend Management',component:FrontendComponent, canActivate:[authGuard]},
    {path:'tabhome',component:TabhomeComponent, canActivate:[authGuard]},
    {path:'Requests',component:RequestsComponent, canActivate:[authGuard]},
    {path:'Products (Books)',component:ProductsRequestComponent, canActivate:[authGuard]},
    {path:'Printer Management',component:TabprinterComponent, canActivate:[authGuard]},
];
