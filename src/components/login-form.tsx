import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function LoginForm({ handleSubmit }: { handleSubmit: (formData: any) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e: any) => {
    e.preventDefault();
    handleSubmit({ email, password });
  }

  return (
    <Card className="mx-auto max-w-sm">
      <form onSubmit={handleChange}>
        <CardHeader>
          <CardTitle className="text-2xl">Entrar</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="joao@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Esqueceu sua senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state on input change
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{" "}
            <Link href="/register" className="underline">
              Cadastre-se
            </Link>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}