import { Component, DoCheck, OnInit, effect } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { UserService } from '../../_service/user.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { menu } from '../../_model/user.model';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-appmenu',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './appmenu.component.html',
  styleUrl: './appmenu.component.css'
})
export class AppmenuComponent implements OnInit, DoCheck {
  jwtToken!: any;
  decode!: any;
  constructor(private service: UserService, private router: Router) {
    effect(() => {
      this.menulist = this.service._menulist();
    })
  }

  iconList!: ['home']
  menulist!: menu[]
  Loginuser = ''
  showmenu = false;

  ngOnInit(): void {
    if (localStorage.getItem('token') != null ){
    this.jwtToken = localStorage.getItem('token') as string;
    this.decode = jwtDecode(this.jwtToken) as string;
    this.service.Loadmenubyrole(this.decode.role).subscribe(item => {
      console.log('Items = ', item)
      this.menulist = item;
    })
  }

  }

  ngDoCheck(): void {
    if (localStorage.getItem('token') != null ){
      this.jwtToken = localStorage.getItem('token') as string;
      this.decode = jwtDecode(this.jwtToken) as string;
    }
    if(this.decode != null){
    this.Loginuser = this.decode.username 
    this.Setaccess();
    }
  }

  Setaccess() {
    let userrole = this.decode.role;
    let currentUrl = this.router.url;
    if (currentUrl === '/register' || currentUrl === '/login' || currentUrl === '/resetpassword' ||
      currentUrl === '/forgetpassword') {
      this.showmenu = false;
    } else {
      this.showmenu = true;
    }
  }

}
