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

// Proteção de rota usando getServerSideProps
const getServerSideProps = async (context: any) => {
    const { req } = context;
    const token = req.cookies.token; // Pega o token dos cookies (ou localStorage no client-side)

    if (!token) {
        // Redireciona para a página de login se o token não existir
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    try {
        // Verifica se o token é válido
        const decoded = jwt.verify(token, 'your_secret_key');
        // Você pode passar o token decodificado para a página se precisar
        return {
            props: {
                user: decoded,
            },
        };
    } catch (err) {
        // Redireciona para login se o token for inválido ou expirar
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
};