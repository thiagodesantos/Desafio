using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly DataContext _context;
        public ProdutoRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Produto> GetProdutoPorIdAsync(int id)
        {
            return await _context.Produtos.FindAsync(id);
        }

        public async Task<Produto> GetProdutoPorNomeAsync(string nome)
        {
           return await _context.Produtos
               .SingleOrDefaultAsync(x => x.Nome == nome);
        }

        public async Task<IEnumerable<Produto>> GetProdutosAsync()
        {
            return await _context.Produtos.ToListAsync();
        }

        public async Task<Produto> InsertProdutoAsync(Produto produto)
        {
            _context.Produtos.Add(produto);
            var id = await _context.SaveChangesAsync();

            return produto;
        }

        public async Task<bool> RemoveProduto(int id)
        {        
            _context.Remove(await _context.Produtos.FindAsync(id));
             return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Produto produto)
        {
           _context.Entry(produto).State = EntityState.Modified;
        }
    }
}