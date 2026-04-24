import { sql } from '../../../../lib/db';
import CriarProduto from '../../../components/CriarProduto';
import SessionWrapper from 'app/components/sessioncomp';
import ProdutosFilters from '../../../components/ProdutosFilters';

interface Props {
  params: Promise<{ tipo: string }>;
}

export default async function ProdutosPorTipo({ params }: Props) {
  const { tipo } = await params;
  const tipoDecodificado = decodeURIComponent(tipo);

  try {
    const resultado = await sql`SELECT * FROM produtos WHERE tipo = ${tipoDecodificado}`;

    const produtos = resultado.map((p: any) => ({
      ...p,
      imagem: p.imagem ? `data:image/webp;base64,${Buffer.from(p.imagem).toString('base64')}` : null,
    }));

    return (
      <section>
        <div className="justify-center bg-white flex w-screen">
          <SessionWrapper>
            <CriarProduto />
          </SessionWrapper>
        </div>

        <ProdutosFilters produtos={produtos} tipoAtual={tipoDecodificado} />
      </section>
    );
  } catch (err) {
    return (
      <main className="min-h-screen bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
            Erro ao carregar produtos
          </div>
        </div>
      </main>
    );
  }
}
