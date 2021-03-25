import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'events';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Produto } from 'src/app/_models/produto';
import { ProdutoService } from 'src/app/_services/produto.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  public produtos$: Produto[];
  proModel: any = {};
  fileData: File;

  constructor(private produtoService: ProdutoService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.produtoService.getProdutos().subscribe(response =>{
      this.produtos$ = response
    })
  }

  fileProgress(event) {
    this.fileData = event.target.files;
  }

  inserir(){
    const formData = new FormData();          
    this.produtoService.insertProduto(this.proModel).subscribe(response =>{

      if(this.fileData[0] != null)
      {        
        formData.append("produtoId", response.id.toString());
        formData.append('file', this.fileData[0], this.fileData[0].name);
        
        this.produtoService.uploadFoto(formData).subscribe(responseFoto =>{
          response.foto = responseFoto.foto;
        }, error =>{        
          this.toastr.error(error.error);
        });
      }

      this.produtos$.push(response);

    }, error =>{      
      this.toastr.error(error.error);
    })
  }

  

  deletar(id){
    this.produtoService.deletarProduto(id).subscribe(response =>{
      if(response)
      {
        this.produtos$ = this.produtos$.filter(x => x.id != id);     
        this.toastr.success("Item removido!");
      }
    }, error =>{
      console.log(error)
      this.toastr.error(error.error);
    })
  }

}
