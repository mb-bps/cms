import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TabsComponent } from '../../reuseable/tabs/tabs.component';
import { PrinterstatisticsComponent } from "../../pages/printerstatistics/printerstatistics.component";

@Component({
  selector: 'app-tabprinter',
  standalone: true,
  imports: [TabsComponent, CommonModule, MaterialModule, PrinterstatisticsComponent],
  templateUrl: './tabprinter.component.html',
  styleUrl: './tabprinter.component.css'
})
export class TabprinterComponent {
  tabs: string [] = ['Printer Request','Printer Statistics'];
  activatedTabIndex: number = 0;

  ngOnInit(): void {
  }
  tabChange(tabIndex: number) {
    this.activatedTabIndex = tabIndex;
  }
}
