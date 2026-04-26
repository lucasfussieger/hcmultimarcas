import { signOut, useSession } from 'next-auth/react';

export default function LogoutButton() {

  const { data: session} = useSession();
  const handleSignOut = () => {
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