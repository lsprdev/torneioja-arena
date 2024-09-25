import { RegisterForm } from "@/components/register-form"
import { bebasNeue } from "../layout"
import { CalendarDays } from "lucide-react"
export default function Page() {
    return (
        <>
            <div className="flex-col h-screen w-full justify-center px-4">
                <div className="flex h-14 w-full bg-black items-center px-20">
                    <span className="flex">
                        <CalendarDays size={29} className="text-white" />
                        <h1 className={`${bebasNeue.className} text-white text-2xl mx-1`}>Arena Já</h1>
                    </span>
                </div>
                <div className="flex h-3/4 w-full items-center justify-center px-4">
                    <RegisterForm />
                </div>
            </div>
        </>
    )
}
