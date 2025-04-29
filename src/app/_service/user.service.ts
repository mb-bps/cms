import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { loginresp, menu, menupermission, menus, orders, registerconfirm, resetpassword, roles, updatepassword, updateuser, usercred, userregister, users } from '../_model/user.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;
  basewebUrl = environment.apiwebUrl;

  _registerresp = signal<registerconfirm>({
    userid: 0,
    username: '',
    otptext: ''
  })

  _username=signal('');

  _menulist = signal<menu[]>([]);

  Userregisteration(_data: userregister) {
    return this.http.post(this.baseUrl + 'User/userregisteration', _data);
  }

  updateAboutus(_data: any) {
    return this.http.post(this.baseUrl + 'updateAboutus', _data);
    // return this.http.post(this.baseUrl + 'User/updateAboutus', _data);
  }

  updateHead(_data: any) {
    return this.http.post(this.baseUrl + 'updateHead', _data);
    // return this.http.post(this.baseUrl + 'User/updateAboutus', _data);
  }

  updateFooter(_data: any) {
    return this.http.post(this.baseUrl + 'updateFooter', _data);
    // return this.http.post(this.baseUrl + 'User/updateAboutus', _data);
  }

  updatePrintStatistics(_data: any) {
    return this.http.post(this.baseUrl + 'updatePrintStatistics', _data);
    // return this.http.post(this.baseUrl + 'User/updateAboutus', _data);
  }

  updateFeaturedImage(_data: FormData) {
    return this.http.post(this.baseUrl + 'updateFeaturedImage', _data);
    // return this.http.post(this.baseUrl + 'User/updateAboutus', _data);
  }

  uploadProduct(_data: FormData) {
    return this.http.post(this.baseUrl + 'uploadProduct', _data);
    // return this.http.post(this.baseUrl + 'User/updateAboutus', _data);
  }

  getpublisherData(requestid: any) {
    return this.http.get(this.baseUrl + 'getPublisherData/' + requestid);
  }

  getProductEditData(requestid: any, isbnnoEN: any) {
    return this.http.get(this.baseUrl + 'getProductEditData/' + requestid +'/'+ isbnnoEN);
  }

  productApprovedUpdate(requestid: any, isbnnoEN: any, data: any) {
    return this.http.post(this.baseUrl + 'productApprovedUpdate', {requestid: requestid, isbnnoEN: isbnnoEN, data});
  }

  getProductListClient(client_id: any) {
    return this.http.get<any>(this.baseUrl + 'getProductListClient/' + client_id);
  }

  getProductList(owner: any) {
    return this.http.get<any>(this.baseUrl + 'getProductList/' + owner);
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiwebUrl + '/auth/GetAllCategories');
  }

  Confirmregisteration(_data: registerconfirm) {
    return this.http.post(this.baseUrl + 'User/confirmregisteration', _data);
  }

  Proceedlogin(_data: usercred) {
    return this.http.post<loginresp>(this.baseUrl + 'signin', _data);
  }

  Loadmenubyrole(role: string) {
    return this.http.get<menu[]>(this.baseUrl + 'AllMenusbyRole/' + role);
  }

  Resetpassword(_data: resetpassword) {
    return this.http.post(this.baseUrl + 'User/resetpassword', _data);
  }

  Forgetpassword(username: string) {
    return this.http.get(this.baseUrl + 'User/forgetpassword?username=' + username)
  }

  Updatepassword(_data: updatepassword) {
    return this.http.post(this.baseUrl + 'User/updatepassword', _data);
  }

  Getmenupermission(role:string,menuname:string){
    return this.http.get<menupermission>(this.baseUrl + 'GetMenupermissionbyrole/'+role+'/'+menuname)
  }

  Getallusers() {
    return this.http.get<users[]>(this.baseUrl + 'getUsers');
  }

  GetUserbycode(code:string) {
    return this.http.get<users>(this.baseUrl + 'User/GetBycode?code='+code);
  }

  Getallroles() {
    return this.http.get<roles[]>(this.baseUrl + 'GetAllRoles');
  }

  GetAllSliders() {
    return this.http.get<roles[]>(this.baseUrl + 'GetAllSliders');
  }

  FindSliders(id: any) {
    return this.http.get<roles[]>(this.baseUrl + 'FindSliders/'+ id);
  }

  FindPartners(id: any) {
    return this.http.get<roles[]>(this.baseUrl + 'FindPartners/'+ id);
  }
  getHead(): Observable<any> {
    return this.http.get(this.basewebUrl + '/head');
  }

  getFooter(): Observable<any> {
    return this.http.get(this.basewebUrl + "/footer");
  }

  getPrintStats(): Observable<any> {
    return this.http.get(this.baseUrl + "getPrintStatistics");
  }

  getHome(): Observable<any> {
    return this.http.get(environment.apiwebUrl + '/home');
  }

  getHomeImages(): Observable<any> {
    return this.http.get(environment.apiwebUrl + '/homeImages');
  }

  getAllPartners(): Observable<any> {
    return this.http.get(environment.apiwebUrl + '/findAllPartners');
  }

  Updaterole(_data: updateuser) {
    return this.http.post(this.baseUrl + 'User/updaterole', _data);
  }
  Updatestatus(_data: updateuser) {
    return this.http.post(this.baseUrl + 'User/updatestatus', _data);
  }

  Getallmenus() {
    return this.http.get<menus[]>(this.baseUrl + 'GetAllMenus');
  }

  Assignrolepermission(_data:menupermission[]){
    return this.http.post(this.baseUrl + 'assignrolepermission', _data);
  }

  Addrolepermission(_data: any){
    return this.http.post(this.baseUrl + 'addrolepermission', _data);
  }

  sendEmailService(email: string, lang: string){
    return this.http.post(this.baseUrl + 'send-email', {email, lang});
  }

  orderStatusEmailService(email: string, selectedValue: string, orderNo: any, lang: string){
    return this.http.post(this.baseUrl + 'order-email', {email, selectedValue, orderNo, lang});
  }

  resetPasswordService(resetObj: any) {
    return this.http.post<any>(this.baseUrl + 'reset-password', resetObj);
  }

  getRegReqListReviewer(owner: any) {
    return this.http.get<any>(this.baseUrl + 'GetRegReqListReviewer/' + owner);
  }

  getRegReqListPublisher(reqid: any) {
    return this.http.get<any>(this.baseUrl + 'GetRegReqListPublisher/' + reqid);
  }

  getOrders(body: any) {
    return this.http.post<orders[]>(this.baseUrl + 'getOrders' , body);
  }
  getOrderDetail(body: any) {
    return this.http.post<orders[]>(this.baseUrl + 'getOrderDetail' , body);
  }

  getOrderDetailByOrderId(orderId: any): Observable<any> {
    return this.http.get(environment.apiUrl + "getOrderDetailByOrderId/" + orderId);
  }

  updateOrderStatus(body: any){
    return this.http.post<any>(environment.apiUrl + "updateOrderStatus", body);
  }

  getUserEmail(body: any){
    return this.http.post<any>(environment.apiUrl + "getUserEmail", body);
  }
}
