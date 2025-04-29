import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_service/user.service';
import { jwtDecode } from "jwt-decode";

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let toastr = inject(ToastrService)
  let service = inject(UserService)
  let jwtToken: any;
  let decode: any;
  let decodeemail: string;
  let decodeusername: string;
  let decoderole: string;
  let menuname = '';

  if (route.url.length > 0) {
    menuname = route.url[0].path;
  }
  
  jwtToken = localStorage.getItem('token');

  if(jwtToken != null){
  decode = jwtDecode(jwtToken);
  decodeemail! = decode.email; 
  decoderole! = decode.role
}
  if (decodeemail! != null) {
    if(menuname!=''){
      service.Getmenupermission(decoderole!, menuname).subscribe(item => {
        if (item.haveview) {
          return true;
        } 
        else {
          toastr.warning('Unauthorized access');
          router.navigateByUrl('/');
          return false;
        }
      })
      return true;
    }
    else{
      return true;
    }
  } else {
    toastr.warning('Unauthorized access');
    router.navigateByUrl('/login');
    return false;
  }

 

};
