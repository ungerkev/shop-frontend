import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  showSearch: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSearch(showSearch: any): void {
    this.showSearch = showSearch;
  }
}
