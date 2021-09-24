import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() showSearch: boolean = false;
  @Output() showSearchChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  closeSearch(): void {
    this.showSearch = false;
    this.showSearchChanged.emit(this.showSearch);
  }

}
