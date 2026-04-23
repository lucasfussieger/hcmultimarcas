import '../globals.css';


export default function Sobre() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* HISTÓRIA + MISSÃO */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6 mb-12">
          <div className="md:col-span-5 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossa História</h3>
            <p className="text-gray-700 mb-4">
              A HC Multimarcas começou de forma simples, ainda na época escolar, com a venda de peças avulsas
              para amigos e conhecidos. Com dedicação, bom gosto e foco no cliente, o negócio foi crescendo
              naturalmente até se consolidar como uma referência em moda masculina em Tijucas e região.
            </p>
            <p className="text-gray-700">
              Hoje, a loja oferece uma curadoria cuidadosa de produtos — de camisetas e calças a perfumes e
              acessórios — sempre priorizando qualidade, estilo e preço acessível para o público jovem.
            </p>
          </div>

          <div className="md:col-span-2 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Missão</h3>
            <p className="text-gray-700 mb-6">
              Oferecer estilo, qualidade e preço acessível para o público jovem, com atendimento próximo
              e personalizado.
            </p>
            <div className="bg-gray-100 border-l-4 border-black p-4 rounded">
              <p className="text-sm text-gray-600 italic leading-relaxed">
                "Nascemos pequenos e crescemos com base na confiança dos nossos clientes. Cada peça vendida
                carrega nosso compromisso com a moda e com o atendimento de qualidade."
              </p>
            </div>
          </div>
        </div>

        {/* PÚBLICO + DIFERENCIAIS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-2 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Público-Alvo</h3>
            <p className="text-gray-700 mb-6">
              Atendemos homens de <strong>16 a 35 anos</strong> interessados em moda streetwear, que buscam
              estilo sem abrir mão do bolso.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-max bg-black text-white p-6 rounded text-center">
                <p className="text-3xl font-bold text-white mb-1">16–35</p>
                <p className="text-xs font-bold tracking-widest uppercase text-gray-400">Anos</p>
              </div>
              <div className="flex-1 min-w-max bg-gray-200 p-6 rounded text-center">
                <p className="text-3xl font-bold text-black mb-1">Street</p>
                <p className="text-xs font-bold tracking-widest uppercase text-gray-600">Wear</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Nossos Diferenciais</h3>
            <div className="space-y-5">
              {[
                { title: 'Variedade de produtos', desc: 'Camisetas, calças, bermudas, bonés, perfumes e acessórios em um só lugar.' },
                { title: 'Estilo sempre atualizado', desc: 'Curadoria com foco nas tendências do streetwear masculino.' },
                { title: 'Atendimento próximo', desc: 'Suporte via WhatsApp com resposta rápida e atendimento personalizado.' },
                { title: 'Preço acessível', desc: 'Qualidade premium sem custo exagerado — moda para todos.' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <svg className="w-5 h-5 hcm flex-shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3.854 5.146a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.793l3.646-3.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-sm text-gray-900 mb-1">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}