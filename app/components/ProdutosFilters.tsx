'use client';

import { useState } from 'react';
import { buscarProdutosPorTipo, buscarProdutos } from '../actions/produtos';
import '../globals.css';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  valor: number;
  tipo?: string;
  imagem?: any;
}

export default function ProdutosFilters({ produtos: allProdutos }: { produtos: Produto[] }) {
  const [search, setSearch] = useState('');
  const [tipo, setTipo] = useState('');
  const [loading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState(allProdutos);

  const tipos = ['Camiseta', 'Calça', 'Boné', 'Perfume', 'Acessório'];

  async function filtrarPorTipo(tipoSelecionado: string) {
    setLoading(true);
    setTipo(tipoSelecionado);

    try {
      const data = await buscarProdutosPorTipo(tipoSelecionado);
      setProdutos(data as Produto[]);
    } catch {
      setProdutos(allProdutos);
    }

    setLoading(false);
  }

  async function limparFiltros() {
    setLoading(true);
    setSearch('');
    setTipo('');

    try {
      const data = await buscarProdutos();
      setProdutos(data as Produto[]);
    } catch {
      setProdutos(allProdutos);
    }

    setLoading(false);
  }

  const filtrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Produtos</h1>

        {/* Filtros */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Filtrar por tipo</h2>

          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => limparFiltros()}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                !tipo
                  ? 'hcm text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              disabled={loading}
            >
              Todos
            </button>

            {tipos.map((tipoItem) => (
              <button
                key={tipoItem}
                onClick={() => filtrarPorTipo(tipoItem)}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  tipo === tipoItem
                    ? 'hcm text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                disabled={loading}
              >
                {tipoItem}
              </button>
            ))}
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            {loading ? 'Carregando...' : `${filtrados.length} produto${filtrados.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Grid de Produtos */}
        {!loading && filtrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtrados.map((produto) => (
              <a key={produto.id} href={`/produtos/${produto.id}`}>
                <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden h-full">
                  <div className="bg-gray-200 h-48 overflow-hidden flex items-center justify-center">
                    {produto.imagem ? (
                      <img
                        src={produto.imagem}
                        alt={produto.nome}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-gray-400">Sem imagem</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">{produto.nome}</h2>
                    <p className="text-gray-600 text-sm mb-4">{produto.descricao}</p>
                    <p className="text-xl font-bold text-blue-600">R$ {parseFloat(String(produto.valor)).toFixed(2)}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Carregando produtos...</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhum produto encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
