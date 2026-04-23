'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { buscarProduto, editarProduto } from '../actions/produtos';

export default function EditarProduto({ id }: { id: number }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [produto, setProduto] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    async function carregarProduto() {
      try {
        const data = await buscarProduto({ id });
        if (data && data[0]) {
          setProduto(data[0]);
        }
      } catch (err) {
        console.error('Erro ao carregar produto:', err);
      }
    }

    carregarProduto();
  }, [isOpen, id]);

  if (!session) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await editarProduto(
        { id },
        {
          nome: formData.get('nome') as string,
          descricao: formData.get('descricao') as string,
          status: formData.get('status') === 'true' ? 'true' : 'false',
          valor: parseFloat(formData.get('valor') as string),
          tipo: formData.get('tipo') as string,
        }
      );
      setIsOpen(false);
      alert('Produto atualizado com sucesso!');
      window.location.reload();
    } catch (err) {
      alert('Erro ao atualizar produto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Editar Produto
      </button>

      {isOpen && produto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Editar Produto</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  name="nome"
                  required
                  defaultValue={produto.nome}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  name="descricao"
                  required
                  rows={3}
                  defaultValue={produto.descricao}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                <input
                  type="number"
                  step="0.01"
                  name="valor"
                  required
                  defaultValue={produto.valor}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  name="tipo"
                  required
                  defaultValue={produto.tipo}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option>Camiseta</option>
                  <option>Calça</option>
                  <option>Boné</option>
                  <option>Perfume</option>
                  <option>Acessório</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  required
                  defaultValue={produto.status}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
                  disabled={loading}
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
