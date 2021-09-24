import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { NavigationComponent } from './navigation.component';
import { navigationRouting } from './navigation-routing';



@NgModule({
  declarations: [
    NavigationComponent,
    NavbarComponent,
    SearchComponent,
  ],
  imports: [
    navigationRouting,
    CommonModule,
  ],
  exports: [
    NavigationComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class NavigationModule { }
