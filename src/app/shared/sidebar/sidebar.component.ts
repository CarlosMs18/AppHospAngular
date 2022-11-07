import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  sideBar : any;
  constructor(private sidebarService : SidebarService,
              private router : RouterModule) {
    this.sideBar = sidebarService.sideBarMenu;

   }

  ngOnInit(): void {
  }

}
