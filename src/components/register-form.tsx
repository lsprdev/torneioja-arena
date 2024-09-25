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

export function RegisterForm() {
    return (
        <Card className="mx-auto max-w-sm">
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
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="joao@example.com"
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
                            required />
                    </div>
                    <Button type="submit" className="w-full">
                        Criar conta
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Já tem uma conta?{" "}
                    <Link href="/login" className="underline">
                        Entrar
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
