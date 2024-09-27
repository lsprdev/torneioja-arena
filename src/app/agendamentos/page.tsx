
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
} from "@/components/ui/table"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"
import { bebasNeue } from "../fonts/fonts"

export default function Page() {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="flex-col w-screen">
            <Card className="w-full md:w-6/12 mx-auto">
                    <CardHeader>
                        <CardTitle>Meus Agendamentos</CardTitle>
                        <CardDescription>Confira os agendamentos realizados.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableCaption>Agendamentos</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Data</TableHead>
                                    <TableHead>Horário</TableHead>
                                    <TableHead>Arena</TableHead>
                                    <TableHead>Quadra</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>10/10/2021</TableCell>
                                    <TableCell>19:00</TableCell>
                                    <TableCell>Arena 1</TableCell>
                                    <TableCell>Quadra 1</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <span className="flex items-center justify-center my-8">
                    <CalendarDays size={29} className="text-white" />
                    <h1 className={`${bebasNeue.className} text-white text-2xl mx-1`}>Arena Já</h1>
                </span>   
            </div>
        </div>
    )


}