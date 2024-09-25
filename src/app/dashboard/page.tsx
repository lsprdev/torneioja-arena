'use client'
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';

export default function Page() {

    useEffect(() => {
        // Verifica se o token existe
        if (!localStorage.getItem('arena_token')) {
            // Redireciona para a página de login se o token não existir
            window.location.href = '/login';
        }
    });


    return (
        <>
            <div className="flex h-screen w-full items-center justify-center px-4">
            <div>
                <h1 className="text-white text-2xl mx-1">Dashboard</h1>
            </div>
            </div>
        </>
    )
}
