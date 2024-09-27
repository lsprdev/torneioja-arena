'use client'

import { RegisterForm } from "@/components/register-form"
import { bebasNeue } from "../fonts/fonts"
import { CalendarDays } from "lucide-react"
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Page() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleRegister = (formData: any) => {
        setLoading(true);

        const { name, email, password } = formData;

        axios.post('https://api2.lspr.dev/api/signup', { name, email, password })
            .then((response: any) => {
                const { message, data } = response.data;

                if (message === "Usuário já existe!") {
                    toast({
                        variant: "destructive",
                        title: 'Não foi possível efetuar o cadastro.',
                        description: 'Usuário já existe!',
                    });
                    setLoading(false);
                    return;
                }

                toast({
                    variant: "default",
                    title: 'Sucesso!',
                    description: 'Conta criada com sucesso!',
                    className: 'bg-green-600 text-white border-solid border-1',
                });
                
                localStorage.setItem('arena_token', data.access_token);

                setTimeout(() => {
                    setLoading(false)
                    window.location.href = '/calendar';
                }, 2000);
            })
            .catch((error: any) => {
                console.error('Erro ao cadastrar:', error);
                toast({
                    variant: "destructive",
                    title: 'Não foi possível efetuar o cadastro.',
                    description: 'Verifique suas credenciais e tente novamente, talvez o email já esteja cadastrado.',
                });
            });
    };

    return (
        <>
            <div className="flex h-screen w-full items-center justify-center px-4">
                <div>
                    <RegisterForm handleSubmit={handleRegister} loading={loading} />
                    <span className="flex items-center justify-center my-8">
                        <CalendarDays size={29} className="text-white" />
                        <h1 className={`${bebasNeue.className} text-white text-2xl mx-1`}>Arena Já</h1>
                    </span>
                </div>
            </div>
        </>
    )
}
