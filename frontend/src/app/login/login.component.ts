import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private dataService: DataService) {}

  login() {
    this.dataService.login(this.username, this.password).subscribe({
      next: (response) => {
        alert(`Bienvenue ${this.username}`);
        this.router.navigate(['/results']);
      },
      error: (error) => {
        alert(error.error.message);
      }
    });
  }
}
