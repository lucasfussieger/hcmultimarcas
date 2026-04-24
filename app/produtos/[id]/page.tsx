import { buscarProduto } from '../../actions/produtos';
import { buscarloja } from '../../actions/loja';
import ProductDetails from '../../components/ProductDetails';
import SessionWrapper from 'app/components/sessioncomp';
import EditarProduto from 'app/components/EditarProduto';
import DeletarProduto from 'app/components/DeletarProduto';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProdutoPage({ params }: Props) {
  try {
    const { id } = await params;

    const resProduto = await buscarProduto({ id: parseInt(id) });
    const loja = await buscarloja();
    const telefone = loja?.telefone || '5548999143649';

    if (!resProduto || !resProduto[0]) {
      return (
        <main className="min-h-screen bg-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-center text-gray-600 text-lg">Produto não encontrado</p>
          </div>
        </main>
      );
    }

    const prod = resProduto[0];
    const imagemSrc = prod.imagem || '/placeholder.png';

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Imagem */}
          <div>
            <img
              src={imagemSrc}
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
  } catch (error) {
    console.error('Erro ao carregar produto:', error);
    return (
      <main className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
            <p className="font-bold">Erro ao carregar produto</p>
            <p className="text-sm mt-2">{error instanceof Error ? error.message : 'Erro desconhecido'}</p>
          </div>
        </div>
      </main>
    );
  }
}
