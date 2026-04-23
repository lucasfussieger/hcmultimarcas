import '../globals.css';

export default function SobreResumo() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs uppercase font-bold tracking-widest text-black mb-2">
              Quem somos
            </p>
            <h2 className="text-4xl uppercase text-gray-300 font-bold tracking-wider leading-tight mb-6">
              Nossa história
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm mb-6">
              A HC Multimarcas nasceu de forma simples, ainda na época escolar, com a venda de peças avulsas.
              Com o tempo, o negócio cresceu e se consolidou como referência em moda masculina, trazendo estilo,
              qualidade e preço justo para o público jovem de Tijucas e região.
            </p>
            <a href="/sobre" className="inline-block bg-black text-white px-7 py-2 rounded hover:bg-gray-800 transition-colors font-bold">
              Saiba mais
            </a>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-100 p-7 rounded text-center">
                <p className="text-4xl font-bold text-black tracking-wider mb-1">
                  6+
                </p>
                <p className="text-xs uppercase font-bold tracking-widest text-gray-500">
                  Categorias
                </p>
              </div>
              <div className="bg-black p-7 rounded text-center">
                <p className="text-4xl hc font-bold tracking-wider mb-1">
                  100%
                </p>
                <p className="text-xs uppercase font-bold tracking-widest text-gray-500">
                  Qualidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}