import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Produto } from '../_models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  baseUrl = environment.apiUrl;
  produtos: Produto[] = [];

  constructor(private http: HttpClient) {}

  getProdutos() {
    if(this.produtos.length > 0) return of(this.produtos);
    return this.http.get<Produto[]>(this.baseUrl + 'produto').pipe(
      map(produtos => {
        this.produtos = produtos;
        return produtos;
      })
    );
  }

  getProduto(produtoId: number) {
    const produto = this.produtos.find(x => x.id === produtoId)
    if(produto !== undefined) return of(produto);
    return this.http.get<Produto>(this.baseUrl + 'produto/' + produtoId);
  }

  insertProduto(model: Produto) {
    return this.http.post(this.baseUrl + 'Produto', model).pipe(
      map((produto: Produto) => {
        if(produto){          
          return produto;
        }
      })
    )
  }

  updateProduto(produto: Produto){
    return this.http.put(this.baseUrl + 'produto', produto).pipe(
      map(() => {
        const index = this.produtos.indexOf(produto);
        this.produtos[index] = produto;
      })
    );
  }

  uploadFoto(formData: FormData){
    return this.http.post(this.baseUrl + 'Produto/uploadFoto', formData).pipe(
      map((produto: Produto) => {
        if(produto){          
          return produto;
        }
      })
    )
  }

  deletarProduto(id: number){   
      return this.http.delete<Produto>(this.baseUrl + 'Produto/?id=' + id);
  }
}
