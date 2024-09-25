import { Button } from "@/components/ui/button"
import { CalendarDays, LayoutDashboard, Home } from "lucide-react"
import { bebasNeue } from "../fonts/fonts"

export default function Page() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="flex p-4">
                    <CalendarDays size={29} className="text-black" />
                    <h1 className={`${bebasNeue.className} text-2xl font-bold text-primary mx-1`}>Arena Já</h1>
                </div>
                <nav className="mt-8">
                    <Button variant="ghost" className="w-full justify-start px-4 py-2 text-left text-black">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Visão geral
                    </Button>
                    <Button variant="ghost" className="w-full justify-start px-4 py-2 text-left text-black">
                        <Home className="mr-2 h-4 w-4" />
                        Minha arena
                    </Button>
                </nav>
            </aside>

            {/* Main content area */}
            <main className="flex-1 p-8">
                <h2 className="text-2xl font-semibold mb-4 text-black">Bem-vindo à sua Arena</h2>
                <p className="text-black">Selecione uma opção no menu lateral para começar.</p>
            </main>
        </div>
    )
}