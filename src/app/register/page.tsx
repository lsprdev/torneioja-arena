import { RegisterForm } from "@/components/register-form"
import { bebasNeue } from "../fonts/fonts"
import { CalendarDays } from "lucide-react"
export default function Page() {
    return (
        <>
            <div className="flex h-screen w-full items-center justify-center px-4">
                <div>
                    <RegisterForm />
                    <span className="flex items-center justify-center my-8">
                        <CalendarDays size={29} className="text-white" />
                        <h1 className={`${bebasNeue.className} text-white text-2xl mx-1`}>Arena Já</h1>
                    </span>
                </div>
            </div>
        </>
    )
}
