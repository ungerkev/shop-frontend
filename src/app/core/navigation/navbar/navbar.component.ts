import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() showSearchChanged = new EventEmitter<any>();
  @Input() showSearch: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    this.showSearchChanged.emit(this.showSearch);
  }

}
