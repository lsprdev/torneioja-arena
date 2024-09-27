'use client'

import { LoginForm } from "@/components/login-form"
import { bebasNeue } from "../fonts/fonts"
import { CalendarDays } from "lucide-react"
import axios from 'axios'
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
 
export default function Page() {
  const { toast } = useToast();
  const  [loading, setLoading] = useState(false);

  const handleLogin = (formData:any) => {
    setLoading(true);
    const { email, password } = formData;
    axios.post('https://api2.lspr.dev/api/login', {
      email,
      password
    }).then((response: any) => {
      const { data } = response.data;

      toast({
        variant: "default",
        title: 'Sucesso!',
        description: 'Login efetuado com sucesso!',
        className: 'bg-green-600 text-white border-solid border-1',
      });
      localStorage.setItem('arena_token', data.access_token);

      setTimeout(() => {
        window.location.href = '/calendar';
        setLoading(false);
      }, 2000);
    }).catch(() => {
      setLoading(false);
      toast({
        variant: "destructive",
        title: 'Não foi possível efetuar o login',
        description: 'Verifique suas credenciais e tente novamente.',
      });
    });
  };

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <div>
          <LoginForm
            loading={loading}
            handleSubmit={handleLogin}
          />
          <span className="flex items-center justify-center my-8">
            <CalendarDays size={29} className="text-white" />
            <h1 className={`${bebasNeue.className} text-white text-2xl mx-1`}>Arena Já</h1>
          </span>
        </div>
      </div>
    </>
  )
}
