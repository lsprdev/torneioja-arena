'use client'
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
import axios from "axios"
import { useEffect, useState } from "react"
import moment from "moment"
import { jwtDecode } from "jwt-decode"

interface Schedule {
        initTime: string;
        endTime: string;
        date: string;
        arena: {
            name: string;
        };
        court: {
            name: string;
        };
    }

export default function Page() {
    const arenaToken = typeof window !== "undefined" ? window.localStorage.getItem('arena_token') : false;
    let userId: any = null;
    if (arenaToken) {
        userId = (jwtDecode(arenaToken) as { id: string }).id;
    }
    

    const [scheduleData, setScheduleData] = useState<Schedule[]>([])
    useEffect(() => {
        if (arenaToken) {
            axios.get(`https://api2.lspr.dev/api/schedule/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${arenaToken}`
                }
            }).then(response => {
                const { data } = response.data
                setScheduleData(data)
                console.log(data)
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                console.log("Request finalizada")
            })
        }
    }, [])

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
                                    <TableHead>Horário Início</TableHead>
                                    <TableHead>Horário Fim</TableHead>
                                    <TableHead>Arena</TableHead>
                                    <TableHead>Quadra</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    scheduleData.map((schedule, index) => {
                                        return ( 
                                            <>
                                            <TableRow>
                                                    <TableCell key={index}>{moment(schedule.initTime).format('YYYY-MM-DD')}</TableCell>
                                                    <TableCell>{moment(schedule.initTime).format('HH:mm')}</TableCell>
                                                    <TableCell>{moment(schedule.endTime).format('HH:mm')}</TableCell>
                                                    <TableCell>{schedule.arena.name}</TableCell>
                                                    <TableCell>{schedule.court.name}</TableCell>
                                            </TableRow>
                                            </>

                                        )
                                    })
                                }
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