'use client'

import { LoginForm } from "@/components/login-form"
import { bebasNeue } from "../fonts/fonts"
import { CalendarDays } from "lucide-react"
import axios from 'axios'
import { useToast } from "@/hooks/use-toast"
 
export default function Page() {
  const { toast } = useToast();
  const handleLogin = (formData:any) => {
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
      }, 2000);
    }).catch(() => {
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
