import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './core/components/products/products.component';
import { UsersComponent } from './core/components/users/users.component';
import { RolesComponent } from './core/components/roles/roles.component';
import { ProductionComponent } from './core/components/production/production.component';
import { SearchProductionComponent } from './core/components/search-production/search-production.component';

const routes: Routes = [
 
  //{path: '**', redirectTo: '', pathMatch: 'full'},
  {path:'products', component: ProductsComponent},
  {path: 'users', component: UsersComponent},
  {path: 'roles', component: RolesComponent},
  {path: 'production', component: ProductionComponent},
  {path: 'search-production', component: SearchProductionComponent},
  {path:'**', redirectTo:'', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
