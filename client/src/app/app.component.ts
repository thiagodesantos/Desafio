import { Component, OnInit } from '@angular/core';
import { LoginService } from './_services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Desafio';

  constructor(public loginService: LoginService ) { }

  ngOnInit(){
    this.verificaUsuario();
  }

  verificaUsuario(){
    const logado: any = localStorage.getItem('logado');
    if(logado === "true")
      this.loginService.setUsuario(logado); 
  }
}
