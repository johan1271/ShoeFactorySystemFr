import { Component, HostListener } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private cookiesService: CookieService, private _appService: AppService) { }

  ngOnInit(): void {
  }

  
}
