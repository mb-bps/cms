import { Component } from '@angular/core';
import { RequestRegCmsComponent } from "../request-reg-cms/request-reg-cms.component";

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [RequestRegCmsComponent],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {

}
