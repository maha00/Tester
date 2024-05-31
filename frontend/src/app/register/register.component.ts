import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string='';
  password: string='';

  constructor(private dataService: DataService, private router: Router) {}

  onRegister(): void {
    this.dataService.registerUser({ name: this.name, password: this.password }).subscribe({
      next: (response) => {
        alert('Vous etes bien enregistre');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert(error.error.message);
      }
    });
  }
}
