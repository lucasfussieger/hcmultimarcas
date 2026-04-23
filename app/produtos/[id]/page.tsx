import { buscarProduto } from '../../actions/produtos';
import { buscarloja } from '../../actions/loja';
import ProductDetails from '../../components/ProductDetails';
import SessionWrapper from 'app/components/sessioncomp';
import EditarProduto from 'app/components/EditarProduto';
import DeletarProduto from 'app/components/DeletarProduto';



export default async function ProdutoPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const res = await buscarProduto({ id: parseInt(id) });
  const loja = await buscarloja();
  const telefone = loja?.telefone || '5548999143649';

  if (!res || !res[0]) {
    return (
      <main className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center text-gray-600 text-lg">Produto não encontrado</p>
        </div>
      </main>
    );
  }

  const prod = res[0];
  const imagem = prod.imagem || '/placeholder.png';

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Imagem */}
          <div>
            <img
              src={imagem}
              alt={prod.nome}
              className="w-full rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Detalhes */}
          <ProductDetails
            nome={prod.nome}
            tipo={prod.tipo}
            valor={prod.valor}
            descricao={prod.descricao}
            telefone={telefone}
          />
        </div>
        <SessionWrapper>
          <div className="flex gap-4 mt-8">
            <EditarProduto id={prod.id} />
            <DeletarProduto id={prod.id} />
          </div>
        </SessionWrapper>
      </div>
    </main>
  );
}
