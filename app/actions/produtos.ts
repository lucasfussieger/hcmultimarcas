'use server'
import { sql } from '../../lib/db'
import sharp from 'sharp'
import { revalidatePath } from 'next/cache'

async function processarImagem(imageBase64: string): Promise<Buffer | null> {
  if (!imageBase64) return null

  try {
    const buffer = Buffer.from(imageBase64, 'base64')
    const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer()
    
    return webpBuffer
  } catch (error) {
    console.error('Erro ao processar imagem:', error)
    return null
  }
}

function converterImagem(imagem: any): string {
  if (!imagem) return ''

  try {
    const buffer = Buffer.isBuffer(imagem) ? imagem : Buffer.from(imagem)
    const base64 = buffer.toString('base64')
    return `data:image/webp;base64,${base64}`
  } catch (error) {
    console.error('Erro ao converter imagem:', error)
    return ''
  }
}

export async function buscarProdutos() {
  const resultado = await sql`SELECT * FROM produtos`

  revalidatePath('/produtos')

  return resultado.map((p: any) => ({
    ...p,
    imagem: p.imagem ? converterImagem(p.imagem) : '',
  }))
}

export async function buscarProdutosPorTipo(tipo: string) {
  const resultado = await sql`SELECT * FROM produtos WHERE tipo = ${tipo}`

  revalidatePath('/produtos')

  return resultado.map((p: any) => ({
    ...p,
    imagem: p.imagem ? converterImagem(p.imagem) : '',
  }))
}

export async function buscarProduto(params: { id: number }) {
  const { id } = params

  try {
    const resultado = await sql`SELECT * FROM produtos WHERE id = ${id}`
    revalidatePath('/produtos')
    return resultado.map((p: any) => ({
      ...p,
      imagem: p.imagem ? converterImagem(p.imagem) : '',
    }))
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    throw error
  }
}

export async function criarProduto(params: { tipo: string; nome: string; descricao: string; valor: number; imagem: string }) {
  const { tipo, nome, descricao, valor, imagem } = params

  let imagemBuffer: Buffer | null = null
  if (imagem) {
    imagemBuffer = await processarImagem(imagem)
  }

  const resultado = await sql`
    INSERT INTO produtos (tipo, nome, descricao, valor, imagem, status)
    VALUES (${tipo}, ${nome}, ${descricao}, ${valor}, ${imagemBuffer}, true)
    RETURNING *
  `
    revalidatePath('/produtos')
  return resultado
}

export async function editarProduto(params: { id: number }, dados: { status: string; tipo: string; nome: string; descricao: string; valor: number }) {
  const { id } = params
  const { status, tipo, nome, descricao, valor } = dados

  const produtoAtual = await sql`SELECT * FROM produtos WHERE id = ${id}`
    
  if (!produtoAtual || produtoAtual.length === 0) {
    throw new Error('Produto não encontrado')
  }

  const atual = produtoAtual[0]

  if (nome === atual.nome && tipo === atual.tipo && descricao === atual.descricao && valor === atual.valor) {
    return [atual]
  }

  const resultado = await sql`
    UPDATE produtos
    SET
      nome = ${nome !== atual.nome ? nome : atual.nome},
      tipo = ${tipo !== atual.tipo ? tipo : atual.tipo},
      status = ${status !== atual.status ? status : atual.status},
      descricao = ${descricao !== atual.descricao ? descricao : atual.descricao},
      valor = ${valor !== atual.valor ? valor : atual.valor}
    WHERE id = ${id}
    RETURNING *
  `
    revalidatePath('/produtos')
  return resultado
}


export async function DeleteProduto(params: { id: number }) {
  const { id } = params
  try {
    await sql`DELETE FROM produtos WHERE id=${id}`
    revalidatePath('/produtos')
    return { mensagem: 'produto excluído' }
  } catch (error) {
    console.error('Erro ao excluir produto:', error)
    throw error
  }
}