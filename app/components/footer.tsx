import '../globals.css';
import { sql } from '../../lib/db';

export default async function Footer() {
  try {
    const resultado = await sql`SELECT * FROM loja LIMIT 1`;
    const loja = resultado && resultado.length > 0 ? resultado[0] : null;

    const telefone = loja?.numero || '5548999143649';
    const instagram = loja?.instagram || 'https://instagram.com/hcmultimarcas';
    const whatsappUrl = `https://wa.me/${telefone}?text=Olá! Tudo Bem? Gostaria de saber mais sobre seus produtos!`;

  return (
    <section className="bg-black text-center text-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12">
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
          GOSTOU DO QUE VIU?
        </h2>
        <p className="text-sm sm:text-base text-white/30 max-w-md">
          Fale com a gente e garanta seu estilo agora mesmo
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          className="wb flex items-center justify-center font-bold text-white gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          <img src="/whatsapp.png" alt="wpp" className="h-5 sm:h-6 lg:h-7" />
          <span className="text-xs sm:text-sm lg:text-base">CHAMAR NO WHATSAPP</span>
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            title="Siga no Instagram"
          >
            <img src="/insta.png" alt="instagram" className="h-6 sm:h-7 lg:h-8" />
          </a>
        </div>
        <div className="w-full border-t border-white/10 pt-6 sm:pt-8">
          <p className="text-xs sm:text-sm text-white/30">
            HC Multimarcas — Tijucas / SC <br />© 2026 Todos os direitos reservados
          </p>
        </div>
      </div>
    </section>
    );
  } catch (error) {
    console.error('Erro ao carregar footer:', error);
    return (
      <section className="bg-black text-center text-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12">
        <p className="text-sm text-white/30">Erro ao carregar footer</p>
      </section>
    );
  }
}