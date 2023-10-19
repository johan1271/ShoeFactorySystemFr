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
import { EditRoleDialogComponent } from './core/components/roles/components/edit-role-dialog/edit-role-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditProductDialogComponent } from './core/components/products/components/edit-product-dialog/edit-product-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { EditUserDialogComponent } from './core/components/users/components/edit-user-dialog/edit-user-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';





@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    ProductsComponent,
    ProductionComponent,
    RolesComponent,
    UsersComponent,
    SearchProductionComponent,
    EditRoleDialogComponent,
    EditProductDialogComponent,
    EditUserDialogComponent,
    
    
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
    MatTableModule ,
    MatDialogModule,
    HttpClientModule,
    MatSelectModule, // Agrega esta línea para el select (mat-select)
    MatRadioModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
