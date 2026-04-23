'use client';

import { signIn } from "next-auth/react";

export default function page() {
    async function Login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            email: formData.get("email") as string,
            password: formData.get("senha") as string,
        }

        signIn("credentials", {
        ...data,
        callbackUrl: "/"
            }
        );
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">Área de Login</h1>
            <form onSubmit={Login} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Digite seu email"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Senha
                    </label>
                    <input
                        type="senha"
                        id="senha"
                        name="senha"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Digite sua senha"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Entrar
                    </button>
                </div>
            </form>
        </main>
    );
}