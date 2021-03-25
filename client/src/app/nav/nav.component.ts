import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {  

  constructor(public loginService: LoginService ,private router: Router, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    
  }

  logout(){
    this.loginService.logout();   
    this.router.navigateByUrl('/');
  }

}
