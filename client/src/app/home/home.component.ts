import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  model: any= {}

  constructor(public loginService: LoginService, private toastr: ToastrService) { }

  ngOnInit(){
  }

  login(){
    this.loginService.login(this.model).subscribe(response => {     
    })
  }  
}
