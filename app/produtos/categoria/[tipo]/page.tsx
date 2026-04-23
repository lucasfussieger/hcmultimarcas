import { sql } from "../../../../lib/db";

export default async function ProdutoPage({
  params,
}: {
  params: { tipo: string };
}) {
  const { tipo } = await params;

  const res = await sql`SELECT * FROM produtos WHERE tipo = ${tipo}`;

  const items = res.map((p: any) => ({
    ...p,
    imagem: p.imagem
      ? Buffer.from(p.imagem).toString("base64")
      : null,
  }));

  return (
    <main className="text-center min-h-screen bg-gray-50 p-10">
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.length > 0 ? (
            items.map((p: any) => (
              <a key={p.id} href={`/produtos/${p.id}`}>
                <article className="bg-gray-100 rounded-3xl p-4 shadow-lg hover:border border-[#731A22]">
                  <h2 className="text-xl font-semibold mb-2">{p.nome}</h2>
                  <img
                    src={`data:image/jpeg;base64,${p.imagem}`}
                    alt={p.nome}
                    className="w-full object-cover rounded mb-3"
                  />
                  <p className="text-sm">{p.descricao}</p>
                </article>
              </a>
            ))
          ) : (
            <div className="p-6 bg-yellow-50 rounded">
              Nenhum produto encontrado.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
