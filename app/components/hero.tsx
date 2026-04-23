import Shadow from "./shadow";
import '../globals.css';

export default function Hero() {
  return (
    <section className="relative h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/hc-hero.jpg')" }}>
        <Shadow /> 
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 text-center text-white max-w-2xl px-4">
        <p className="text-sm hc uppercase font-thin tracking-wider mb-4">
          HC Multimarcas — Tijucas/SC
        </p>
        <h1 className="text-6xl font-bold leading-tight mb-8">
          ESTILO, QUALIDADE
          <br />
          E ATITUDE
        </h1>
        <a href="/produtos" className="inline-block hcm text-white px-8 py-3 rounded hover:bg-blue-700 transition-colors font-bold">
          Ver Produtos
        </a>
      </div>
    </section>
  );
}