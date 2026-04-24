import { sql } from '../../lib/db';
import ProdutosFilters from '../components/ProdutosFilters';
import CriarProduto from '../components/CriarProduto';
import SessionWrapper from 'app/components/sessioncomp';

export default async function Produtos() {
  try {
    const resultado = await sql`SELECT * FROM produtos`;

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

        <ProdutosFilters produtos={produtos} />
      </section>
    );
  } catch (err) {
    return (
      <main className="min-h-screen bg-white py-12">
        <div className="justify-center bg-white flex w-screen">
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
