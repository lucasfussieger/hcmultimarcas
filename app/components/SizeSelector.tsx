'use client';

import { useState } from 'react';

interface SizeSelectorProps {
  onSizeChange?: (size: string) => void;
}

export default function SizeSelector({ onSizeChange }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const sizes = ['P', 'M', 'G', 'GG'];

  function handleSizeSelect(size: string) {
    setSelectedSize(size);
    onSizeChange?.(size);
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-4">Selecionar Tamanho</h2>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeSelect(size)}
            className={`px-6 py-3 border-2 rounded-lg font-bold transition-colors ${
              selectedSize === size
                ? 'hcm text-white'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
      {selectedSize && (
        <p className="text-sm text-gray-600 mt-3">Tamanho selecionado: <strong>{selectedSize}</strong></p>
      )}
    </div>
  );
}
