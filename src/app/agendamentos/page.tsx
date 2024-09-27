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
import { useToast } from "@/hooks/use-toast"
import LoaderSpinner from "@/components/loader-spinner"
import { Button } from "@/components/ui/button"

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
    const [ loading, setLoading ] = useState(false)
    const { toast } = useToast()
    const arenaToken = typeof window !== "undefined" ? window.localStorage.getItem('arena_token') : false;
    let userId: any = null;
    if (arenaToken) {
        userId = (jwtDecode(arenaToken) as { id: string }).id;
    }
    const [scheduleData, setScheduleData] = useState<Schedule[]>([])
    
    useEffect(() => {
        setLoading(true)
        if (arenaToken) {
            axios.get(`https://api2.lspr.dev/api/schedule/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${arenaToken}`
                }
            }).then(response => {
                const { data } = response.data

                if(data.status === 401) {
                    toast({
                        variant: "default",
                        title: 'Ops!',
                        description: 'Sua sessão expirou. Faça login novamente.',
                        className: 'bg-red-600 text-white border-solid border-1',
                    });
                    setTimeout(() => {
                        setLoading(false)
                        window.localStorage.removeItem('arena_token')
                        window.location.href = '/login';
                    }, 2000);
                    return;
                }
                setLoading(false)
                setScheduleData(data)
            }).catch(() => {
                toast({
                    variant: "default",
                    title: 'Ops!',
                    description: 'Ocorreu um erro ao buscar os agendamentos.',
                    className: 'bg-red-600 text-white border-solid border-1',
                });
                setLoading(false)
            });
        } else {
            toast({
                variant: "default",
                title: 'Ops!',
                description: 'Você precisa estar logado para acessar essa página.',
                className: 'bg-red-600 text-white border-solid border-1',
            });
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        }
    }, [])

    return (
        <>
        <div className='flex w-full h-10 items-center justify-end p-9 gap-3'>
            <Button
                size="default"
                onClick={() => window.location.href = '/calendar'}
                className="bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80">
                Agendar
            </Button>
            <Button
                size="default"
                onClick={() => window.location.href = '/login'}
                className="bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80">
                Login
            </Button>
        </div>
        <div className="flex h-5/6 w-screen items-center justify-center p-7">
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
                                { loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" >
                                            <LoaderSpinner size="sm" />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <>
                                        {
                                            scheduleData.length === 0 && loading === false ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center">Nenhum agendamento encontrado.</TableCell>
                                                </TableRow>
                                            ) :
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
                                    </>
                                )}

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
        </>
    )


}