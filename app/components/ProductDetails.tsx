'use client';

import { useState } from 'react';
import SizeSelector from './SizeSelector';

interface ProductDetailsProps {
  nome: string;
  tipo: string;
  valor: number;
  descricao: string;
  telefone: string;
}

export default function ProductDetails({ nome, tipo, valor, descricao, telefone }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState('');

  function handleWhatsApp() {
    const message = selectedSize
      ? `Olá! Gostaria de informações sobre o ${nome} (Tamanho: ${selectedSize}) - R$ ${valor.toFixed(2)}`
      : `Olá! Gostaria de informações sobre o ${nome} - R$ ${valor.toFixed(2)}`;

    const whatsappUrl = `https://wa.me/${telefone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{nome}</h1>
        {tipo && (
          <p className="text-sm uppercase font-bold text-gray-600 tracking-widest">
            {tipo}
          </p>
        )}
      </div>

      <div>
        <p className="text-2xl font-bold text-gray-900 mb-4">
          R$ {parseFloat(String(valor)).toFixed(2)}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Descrição</h2>
        <p className="text-gray-700 leading-relaxed">
          {descricao}
        </p>
      </div>

      <SizeSelector onSizeChange={setSelectedSize} />

      <button
        onClick={handleWhatsApp}
        className="w-full wb text-white py-3 rounded-lg font-bold transition-colors"
      >
        Enviar pelo WhatsApp
      </button>
    </div>
  );
}
