import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from 'src/app/app.service';
import { productionsByUser, userProduction } from '../../models/interfaces';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-search-production',
  templateUrl: './search-production.component.html',
  styleUrls: ['./search-production.component.scss']
})
export class SearchProductionComponent {

  form: FormGroup;

  productions: productionsByUser;
  loader: boolean = true;
  constructor(private formBuilder: FormBuilder, public _appService: AppService, private snackBar: SnackBarService) {
    this.form = this.formBuilder.group({
      search: ['', [Validators.required]],

      startDate: [''],
      endDate: [''],

    });
    this.productions = {
      production: [],
      total_compensation: 0
    }
  }

  ngOnInit(): void {
    this.getAllProductions();
  }

  getAllProductions() {
    this._appService.getAllProductions().subscribe({
      next: (response: any) => {
        console.log(response);
        this.loader = false;
        this.productions.production = response.production;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  searchProduction() {


    if (this.form.invalid) {
      this.snackBar.openSnackBar('Debe llenar el campo de busqueda', 'Cerrar');
      return;
    }
    const formData = this.form.value;
    this.loader = true;
    console.log(formData)

    if (!formData.startDate && !formData.endDate) {

      this._appService.getProductionById(parseInt(formData.search)).subscribe({
        next: (response: any) => {
          console.log(response);
          this.loader = false;
          if(Object.keys(response).length === 0){
            this.snackBar.openSnackBar('No se encontraron resultados', 'Cerrar');
            this.productions.production = [];
            this.productions.total_compensation = 0;
            return;
          }
          const {production, total_compensation} = response;

          this.productions.production = production;
          this.productions.total_compensation = total_compensation;
        },
        error: (error: any) => {
          console.log(error);
        }
      })

    } else if (formData.startDate && formData.endDate) {
      this.loader = false;
      const startDate = formData.startDate.toISOString().slice(0, 10);
      const endDate = formData.endDate.toISOString().slice(0, 10);

      this._appService.getProductionByDate(parseInt(formData.search), startDate, endDate).subscribe({
        next: (response: any) => {
          console.log(response);

          if(Object.keys(response).length === 0){
            console.log('no hay resultados');
            this.snackBar.openSnackBar('No se encontraron resultados', 'Cerrar');
            this.productions.production = [];
            this.productions.total_compensation = 0;
            return;
          }

          const {production, total_compensation} = response;
          this.productions.production = production;
          this.productions.total_compensation = total_compensation;
        },
        error: (error: any) => {
          console.log(error);
        }
      })

    }else{
      this.loader = false;
      this.snackBar.openSnackBar('Debe llenar los campos de fecha', 'Cerrar');
    }
  }

  updateSearch(): void{
    if(this.form['controls']['search'].value == ''){
      this.getAllProductions();
    }

  }

  clearDates() {
    this.form['controls']['startDate'].reset();
    this.form['controls']['endDate'].reset();
  }

  generatePDF() {
    
  }
}
