'use server'
import { sql } from '../../lib/db'

export async function buscarloja() {
  try {
    const resultado = await sql`SELECT * FROM loja LIMIT 1`
    return resultado && resultado.length > 0 ? resultado[0] : null
  } catch (error) {
    console.error('Erro ao buscar loja:', error)
    return null
  }
}

export async function editarloja(dados: { telefone: string; email: string; endereco: string; instagram: string }) {
  const { telefone, email, endereco, instagram } = dados

  const lojaAtual = await sql`SELECT * FROM loja LIMIT 1`

  if (!lojaAtual || lojaAtual.length === 0) {
    throw new Error('Loja não encontrada')
  }

  const atual = lojaAtual[0]

  if (telefone === atual.telefone && email === atual.email && endereco === atual.endereco && instagram === atual.instagram) {
    return atual
  }

  const resultado = await sql`
    UPDATE loja
    SET
      telefone = ${telefone !== atual.telefone ? telefone : atual.telefone},
      email = ${email !== atual.email ? email : atual.email},
      endereco = ${endereco !== atual.endereco ? endereco : atual.endereco},
      instagram = ${instagram !== atual.instagram ? instagram : atual.instagram}
    WHERE id = ${atual.id}
    RETURNING *
  `
  return resultado && resultado.length > 0 ? resultado[0] : atual
}
