import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/_models/produto';
import { ProdutoService } from 'src/app/_services/produto.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  produto: Produto;

  constructor(private produtoService: ProdutoService,  private route: ActivatedRoute,
      private toastr: ToastrService) { }

  fileData: File;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.carregar(+params['id']);
    });    
  }

  carregar(id: number) {
    this.produtoService.getProduto(id).subscribe(produto => {
      this.produto = produto;
    })
  }

  udpate() {
    const formData = new FormData();  
    this.produtoService.updateProduto(this.produto).subscribe(()=> {

      if(this.fileData[0] != null)
      {        
        formData.append("produtoId", this.produto.id.toString());
        formData.append('file', this.fileData[0], this.fileData[0].name);
        
        this.produtoService.uploadFoto(formData).subscribe(responseFoto =>{
          this.produto.foto = responseFoto.foto;
        }, error =>{        
          this.toastr.error(error.error);
        });
      }

      this.toastr.success('Produto Salvo');
      this.editForm.reset(this.produto);
    })   
  }


  fileProgress(event) {
    this.fileData = event.target.files;
  }


}
