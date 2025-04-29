import { Component } from '@angular/core';
import { AppmenuComponent } from "./component/appmenu/appmenu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppmenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'qds';
}
