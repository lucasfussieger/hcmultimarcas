'use server'
import { sql } from '../../lib/db'
import { revalidatePath } from 'next/cache'


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

  try {
    const lojaAtual = await sql`SELECT * FROM loja LIMIT 1`
    console.log('Loja atual:', lojaAtual)

    if (!lojaAtual || lojaAtual.length === 0) {
      throw new Error('Loja não encontrada')
    }

    const atual = lojaAtual[0]

    if (telefone === atual.telefone && email === atual.email && endereco === atual.endereco && instagram === atual.instagram) {
      console.log('Nenhuma alteração detectada')
      return atual
    }

    console.log('Atualizando com:', { telefone, email, endereco, instagram })

    const resultado = await sql`
      UPDATE loja
      SET
        telefone = ${telefone},
        email = ${email},
        endereco = ${endereco},
        instagram = ${instagram}
      WHERE id = ${atual.id}
      RETURNING *
    `

    console.log('Resultado do UPDATE:', resultado)
    revalidatePath('/')

    if (resultado && resultado.length > 0) {
      console.log('Retornando:', resultado[0])
      return resultado[0]
    }

    console.log('Nenhum resultado, retornando atual')
    return atual
  } catch (error) {
    console.error('Erro ao atualizar loja:', error)
    throw error
  }
}
