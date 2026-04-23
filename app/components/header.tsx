'use client';

import '../globals.css';
import { useSession } from 'next-auth/react';
import SessionWrapper from './sessioncomp';
import LogoutButton from './logoutbutton';

export default function Header() {
  return (
    <header className="bg-black flex items-center justify-between w-full px-4 sm:px-6 lg:px-12 py-3 sm:py-4">
      <div className="flex-shrink-0">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
          HC <span className="hc">MULTIMARCAS</span>
        </h1>
      </div>
      <nav className="flex items-center text-gray-300 font-thin gap-4 sm:gap-6 lg:gap-8 text-sm sm:text-base">
        <a href="/" className="hover:text-white transition-colors">
          inicio
        </a>
        <a href="/produtos" className="hover:text-white transition-colors">
          produtos
        </a>
        <a href="/sobre" className="hover:text-white transition-colors">
          sobre
        </a>
        <a href="/contato" className="hover:text-white transition-colors">
          contato
        </a>
        <SessionWrapper>
          <LogoutButton />
        </SessionWrapper>
      </nav>
    </header>
  );
}