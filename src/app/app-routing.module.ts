import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './core/components/products/products.component';
import { UsersComponent } from './core/components/users/users.component';
import { RolesComponent } from './core/components/roles/roles.component';
import { ProductionComponent } from './core/components/production/production.component';
import { SearchProductionComponent } from './core/components/search-production/search-production.component';
import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
 
  { path: 'home', redirectTo: 'home/users', pathMatch: 'full' },
  {path: 'home', component: HomeComponent, 
  canActivate: [AuthGuard],
  children: [
    {path: 'products', component: ProductsComponent},
    {path: 'users', component: UsersComponent},
    {path: 'roles', component: RolesComponent},
    {path: 'productions', component: ProductionComponent},
    {path: 'search-production', component: SearchProductionComponent},
  ]},
  {path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a la página de inicio de sesión por defecto
  { path: '**', redirectTo: '/login' } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
