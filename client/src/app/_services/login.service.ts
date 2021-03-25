import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.apiUrl;
  private usuarioLogado = new ReplaySubject<any>(1);
  usuario = this.usuarioLogado.asObservable();

  constructor(private http: HttpClient, public toastr: ToastrService, public router: Router) { }

  login(model: any){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(model.username + ':' + model.password)
      })
    };

    return this.http.post('https://dev.sitemercado.com.br/api/login', {}, httpOptions).pipe(
      map((response: any) => {
        if (response.success)
        {
          this.setUsuario("true");
          this.toastr.success("logado com sucesso");
          this.router.navigateByUrl('/produtos');
        }
        else
          this.toastr.error("Login e senha Inválidos");
        }
      )
    );
  }

  setUsuario(logado: string){
    localStorage.setItem('logado', logado);
    this.usuarioLogado.next(logado);
  }

  logout(){
    localStorage.removeItem('logado');
    this.usuarioLogado.next(null);
  }
}
