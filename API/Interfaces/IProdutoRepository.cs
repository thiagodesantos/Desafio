using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IProdutoRepository
    {
        void Update(Produto produto);        
        Task<bool> SaveAllAsync();
        Task<bool> RemoveProduto(int id);
        Task<IEnumerable<Produto>> GetProdutosAsync();
        Task<Produto> GetProdutoPorIdAsync(int id);  
        Task<Produto> GetProdutoPorNomeAsync(string nome);
        Task<Produto> InsertProdutoAsync(Produto produto);  
    }
}
