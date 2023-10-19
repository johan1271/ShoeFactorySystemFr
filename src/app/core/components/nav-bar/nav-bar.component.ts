import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  currentDateTime: string;

  constructor() {
    const now = new Date();
    this.currentDateTime = now.toLocaleString();;
  }

  ngOnInit() {
    // Llamada inicial para establecer la fecha.
    this.updateDateTime();
    
    // Actualizar la fecha cada segundo (1000 ms).
    setInterval(() => {
      this.updateDateTime();
    }, 1000);
  }

  updateDateTime() {
    const now = new Date();
    this.currentDateTime = now.toLocaleString();
  }
}
