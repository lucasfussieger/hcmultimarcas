'use client';

import { useState } from 'react';

export default function ContatoForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div className="bg-gray-50 p-8 rounded-lg text-gray-900">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Envie uma mensagem</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
            <input type="text" required className="w-full px-4 py-2 border rounded" placeholder="Seu nome" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
            <input type="tel" className="w-full px-4 py-2 border rounded" placeholder="(48) 99999-9999" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
          <input type="email" required className="w-full px-4 py-2 border rounded" placeholder="seu@email.com" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Assunto</label>
          <select required className="w-full px-4 py-2 border rounded">
            <option>Selecione um assunto</option>
            <option>Dúvida sobre produto</option>
            <option>Pedido / Compra</option>
            <option>Troca ou devolução</option>
            <option>Outro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
          <textarea required rows={5} className="w-full px-4 py-2 border rounded" placeholder="Sua mensagem aqui..." />
        </div>

        <button type="submit" className="w-full wb text-white py-3 rounded font-bold">
          Enviar Mensagem
        </button>
      </form>

      {submitted && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
          <p className="text-sm text-green-700">✓ Mensagem enviada com sucesso! Entraremos em contato em breve.</p>
        </div>
      )}
    </div>
  );
}
