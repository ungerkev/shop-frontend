import { Component, OnInit } from '@angular/core';
import { Event, ResolveEnd, Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showAdminNavigation: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.setShowAdminNavigation();
  }

  /**
   * Sets this.showAdminNavigation to true if url is /admin
   */
  setShowAdminNavigation(): void {
    this.router.events.subscribe((routerData: Event) => {
      if(routerData instanceof ResolveEnd) {
        if(routerData.url.includes('/admin')){
          this.showAdminNavigation = true;
        }
      }
    })
  }
}
