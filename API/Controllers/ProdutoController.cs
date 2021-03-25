using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class ProdutoController : BaseApiController
    {
        private readonly IProdutoRepository _produtoRepository;

        public ProdutoController(IProdutoRepository produtoRepository)
        {            
            _produtoRepository = produtoRepository;
        }

        // api/produtos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produto>>> GetProduto()
        {
            return Ok(await _produtoRepository.GetProdutosAsync());
        }
    
        [HttpGet("{id}")]
        public async Task<ActionResult<Produto>> GetProduto(int id)
        {
            return await _produtoRepository.GetProdutoPorIdAsync(id);
        }
 
        [HttpDelete]
        public async Task<bool> RemoveProduto(int id)
        {
            return await _produtoRepository.RemoveProduto(id);
        }    

        
        [HttpPost]
        public async Task<ActionResult<Produto>> insertProduto(Produto produto)
        {                    
           return await _produtoRepository.InsertProdutoAsync(produto);            
        }

         [HttpPost("uploadFoto")]
         [Route("uploadFoto")]
        public async Task<ActionResult<Produto>> uploadFoto()
        {            
            var produtoId = Int32.Parse(Request.Form["produtoId"]);
            var file = Request.Form.Files[0];         
                                 
            var produto = await _produtoRepository.GetProdutoPorIdAsync(produtoId);

            var folderName = Path.Combine("Resources", "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                produto.Foto = "https://localhost:5001/Resources/Images/" + fileName;
                await _produtoRepository.SaveAllAsync();
                return produto;
            }
            else
            {
                return BadRequest();
            } 
        }

       
        [HttpPut]
        public async Task<ActionResult> UpdateProduto(Produto produto)
        {                      
            _produtoRepository.Update(produto);

            if (await _produtoRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Erro ao atualizar o produto");
        }    
    }
}