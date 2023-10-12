import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { SideBarComponent } from './core/components/side-bar/side-bar.component';
import { ProductsComponent } from './core/components/products/products.component';
import { ProductionComponent } from './core/components/production/production.component';
import { RolesComponent } from './core/components/roles/roles.component';

import { UsersComponent } from './core/components/users/users.component';
import { SearchProductionComponent } from './core/components/search-production/search-production.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    ProductsComponent,
    ProductionComponent,
    RolesComponent,
    UsersComponent,
    SearchProductionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
