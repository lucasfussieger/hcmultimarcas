'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { buscarloja, editarloja } from '../actions/loja';

export default function EditarLoja() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [loja, setLoja] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    async function carregarLoja() {
      try {
        const data = await buscarloja();
        if (data) {
          setLoja(data);
        }
      } catch (err) {
        console.error('Erro ao carregar loja:', err);
      }
    }

    carregarLoja();
  }, [isOpen]);

  if (!session) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await editarloja({
        telefone: formData.get('telefone') as string,
        email: formData.get('email') as string,
        endereco: formData.get('endereco') as string,
        instagram: formData.get('instagram') as string,
      });
      setIsOpen(false);
      alert('Loja atualizada com sucesso!');
      window.location.reload();
    } catch (err) {
      alert('Erro ao atualizar loja');
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
        Editar Loja
      </button>

      {isOpen && loja && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Editar Loja</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input
                  name="telefone"
                  required
                  defaultValue={loja.telefone}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="5548999999999"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={loja.email}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                <input
                  name="endereco"
                  required
                  defaultValue={loja.endereco}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Cidade — Estado"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                <input
                  name="instagram"
                  type="url"
                  defaultValue={loja.instagram}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="https://instagram.com/seu-perfil"
                />
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
