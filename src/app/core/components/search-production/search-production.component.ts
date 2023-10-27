import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from 'src/app/app.service';
import { userProduction } from '../../models/interfaces';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-search-production',
  templateUrl: './search-production.component.html',
  styleUrls: ['./search-production.component.scss']
})
export class SearchProductionComponent {

  form: FormGroup;

  productions: userProduction[] = [];

  constructor(private formBuilder: FormBuilder, public _appService: AppService, private snackBar: SnackBarService) {
    this.form = this.formBuilder.group({
      search: ['', [Validators.required]],

      startDate: [''],
      endDate: [''],

    });
  }

  ngOnInit(): void {
    this.getAllProductions();
  }

  getAllProductions() {
    this._appService.getAllProductions().subscribe({
      next: (response: any) => {
        console.log(response);
        this.productions = response.production;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  searchProduction() {


    if (this.form.invalid) {
      return;
    }
    const formData = this.form.value;



    if (formData.startDate == '' && formData.endDate == '') {

      this._appService.getProductionById(parseInt(formData.search)).subscribe({
        next: (response: any) => {
          console.log(response);

        },
        error: (error: any) => {
          console.log(error);
        }
      })

    } else if (formData.startDate != '' && formData.endDate != '') {

      const startDate = formData.startDate.toISOString().slice(0, 10);
      const endDate = formData.endDate.toISOString().slice(0, 10);

      this._appService.getProductionByDate(parseInt(formData.search), startDate, endDate).subscribe({
        next: (response: any) => {
          console.log(response);
          this.productions = response.production;
        },
        error: (error: any) => {
          console.log(error);
        }
      })

      


    }else{
      this.snackBar.openSnackBar('Debe llenar los campos de fecha', 'Cerrar');
    }
  }
}
