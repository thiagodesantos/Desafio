using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IProdutoService
    {
        void Update(Produto user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Produto>> GetProdutosAsync();
        Task<Produto> GetProdutoPorIdAsync(int id);
        Task<Produto> GetProdutoPorNomeAsync(string nome);
    }
}