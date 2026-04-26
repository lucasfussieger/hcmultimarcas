import Hero from "./components/hero";
import SobreResumo from "./components/sobreresumo";
import { sql } from '../lib/db';

export default async function Home() {

  try {
    const resultado = await sql`SELECT * FROM produtos LIMIT 3`;

    const products = resultado.map((p: any) => ({
      ...p,
      imagem: p.imagem ? `data:image/webp;base64,${Buffer.from(p.imagem).toString('base64')}` : null,
    }));

    return (
      <section className="min-h-screen bg-gray-100">
        <Hero />
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-end mt-20">
            <div className="mb-5">
              <p className="text-xs uppercase font-bold tracking-widest text-black mb-1">
                Seleção especial
              </p>
              <h2 className="text-4xl text-gray-300 uppercase font-bold tracking-wider">
                Destaques
              </h2>
            </div>
            <a
              href="/produtos"
              className="text-sm uppercase font-bold tracking-wide text-gray-600 hover:text-black transition-colors"
            >
              Ver todos →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative bg-gray-200 h-80 flex items-center justify-center overflow-hidden">
                  {product.imagem ? (
                    <img
                      src={product.imagem}
                      alt={product.nome}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">Sem imagem</span>
                  )}
                </div>
                <div className="p-5">
                  <h5 className="text-lg font-bold text-gray-900 mb-2">
                    {product.nome}
                  </h5>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.descricao}
                  </p>
                  <p className="text-xl font-bold text-gray-900 mb-4">
                    R$ {parseFloat(String(product.valor)).toFixed(2)}
                  </p>
                  <a
                    href={`/produtos/${product.id}`}
                    className="block text-center hcm text-white py-2 rounded font-bold transition-colors"
                  >
                    Ver mais
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (err) {
    return (
      <section className="min-h-screen py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-gray-600">Erro ao carregar destaques</p>
        </div>
        <SobreResumo />
      </section>
    );
  }
}