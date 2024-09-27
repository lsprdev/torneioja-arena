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
import LoaderSpinner from "./loader-spinner"

export function RegisterForm({ handleSubmit, loading }: { handleSubmit: (formData: any) => void, loading: boolean }) {
    const [name, setName] = useState('');
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
                <CardTitle className="text-2xl">Cadastro</CardTitle>
                <CardDescription>
                    Preencha os campos abaixo para criar sua conta.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Nome</Label>
                        <Input
                            id="name"
                            type="name"
                            placeholder="João da Silva"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="joao@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Senha</Label>
                        </div>
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>
                    <Button type="submit" className="w-full">
                        {loading ? <LoaderSpinner color="accent" size="sm"/> : "Criar conta"}
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Já tem uma conta?{" "}
                    <Link href="/login" className="underline">
                        Entrar
                    </Link>
                </div>
            </CardContent>
            </form>
        </Card>
    )
}
