import { buscarloja } from '../actions/loja';
import ContatoForm from '../components/ContatoForm';
import SessionWrapper from 'app/components/sessioncomp';
import EditarLoja from 'app/components/EditarLoja';

export default async function Contato() {
  const loja = await buscarloja();
  const telefone = loja?.telefone 
  const endereco = loja?.endereco 
  const email = loja?.email  

  const whatsappUrl = `https://wa.me/${telefone}?text=Olá! Tudo Bem? Gostaria de saber mais sobre seus produtos!`;

  return (
    <main className="min-h-screen bg-white py-12">
        <SessionWrapper>
            <div className="flex justify-end mb-6">
                <EditarLoja />
            </div>
        </SessionWrapper>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Contato</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-gray-50 p-8 rounded-lg space-y-6">
              <div className="flex gap-4">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326z"/>
                </svg>
                <div>
                  <p className="text-sm font-bold text-gray-600">WhatsApp</p>
                  <p className="font-bold text-gray-900">{telefone}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"/>
                </svg>
                <div>
                  <p className="text-sm font-bold text-gray-600">E-mail</p>
                  <p className="font-bold text-gray-900">{email}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                <div>
                  <p className="text-sm font-bold text-gray-600">Endereço</p>
                  <p className="font-bold text-gray-900">{endereco}</p>
                </div>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              className="wb flex items-center justify-center font-bold text-white gap-3 w-auto p-3 rounded-full hover:opacity-90 transition-opacity"
            >
              <img src="/whatsapp.png" alt="wpp" className="h-8" />
              <span>ENVIAR MENSAGEM</span>
            </a>

            <div className="bg-gray-50 text-gray-900 p-6 rounded-lg">
              <p className="text-xs uppercase font-bold text-gray-900 mb-4">Atendimento</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between pb-3 border-b">
                  <span className="text-gray-600">Seg — Sex</span>
                  <span className="font-bold">9h às 18h</span>
                </div>
                <div className="flex justify-between pb-3 border-b">
                  <span className="text-gray-600">Sábado</span>
                  <span className="font-bold">9h às 13h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Domingo</span>
                  <span className="text-gray-400">Fechado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <ContatoForm />
          </div>
        </div>
      </div>
    </main>
  );
}