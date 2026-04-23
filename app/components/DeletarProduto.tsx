'use client';

import { useTransition } from 'react';
import { DeleteProduto } from '../actions/produtos';
import { useSession } from 'next-auth/react';

export default function ProdutoButton({ id }: { id: string }) {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  if (!session) return null;

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await DeleteProduto({ id: parseInt(id) });
          window.location.href = '/produtos';
        })
      }
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
    >
      {isPending ? 'Deletando...' : 'Deletar Produto'}
    </button>
  );
}
