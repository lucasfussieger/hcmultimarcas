import { signOut, useSession } from 'next-auth/react';

export default function LogoutButton() {

  const { data: session} = useSession();
  // A função é chamada quando o botão é clicado
  const handleSignOut = () => {
    // A função signOut faz a requisição para encerrar a sessão
    signOut({ callbackUrl: '/login' }); 
  };
  if (!session){
    return null;
  }
  return (
    <section>
         <a onClick={handleSignOut} className='hover:text-white'>
          Sair
        </a>
    </section>
   
    
  );
}