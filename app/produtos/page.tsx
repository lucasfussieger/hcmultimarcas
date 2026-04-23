

import ProdutosFilters from '../components/ProdutosFilters';
import CriarProduto from '../components/CriarProduto';
import SessionWrapper from 'app/components/sessioncomp';
import { buscarProdutos } from '../actions/produtos';


export default async function Produtos() {
  try {
    const produtos = await buscarProdutos();

    return(
        <section>
            <div className='justify-center bg-white flex w-screen'>
                <SessionWrapper>
                    <CriarProduto />
                </SessionWrapper>
            </div>
            
            <ProdutosFilters produtos={produtos} />;
        </section>)
        
  } catch (err) {
    return (
      <main className="min-h-screen bg-white py-12">
        <div className='justify-center bg-white flex w-screen'>
                <SessionWrapper>
                    <CriarProduto />
                </SessionWrapper>
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
            Erro ao carregar produtos
          </div>
        </div>
      </main>
    );
  }
}
