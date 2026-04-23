
import './globals.css'
import { Oswald } from 'next/font/google'
import Header from './components/header'
import Footer from './components/footer'


const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '400', '500', '600', '700'],
  variable: '--font-oswald',
})

export const metadata = {
  title: 'HC MULTIMARCAS - Moda Jovem em Tijucas/SC',
  description: 'HC Multimarcas é a loja de moda masculina referência em Tijucas/SC, oferecendo estilo, qualidade e preço justo para o público jovem. Descubra nossas coleções exclusivas e atendimento personalizado.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={` font-sans`}>
      <body className={`${oswald.className} antialiased flex flex-col min-h-screen`}>
        <Header/>
            
            <div>
              {children}
            </div>
        <Footer/>
      </body>
    </html>
  )
}
