"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, ChevronLeft, ChevronRight, CalendarDays } from "lucide-react"
import { bebasNeue } from '../fonts/fonts';
import axios from 'axios';
import { useEffect } from 'react';
import LoaderSpinner from '@/components/loader-spinner';
import CalendarComponent from '@/components/calendar-component';

export default function Page() {
    const [selectedCourt, setSelectedCourt] = useState("Quadra 1")
    const [loading, setLoading] = useState(false)
    const [arena, setArena]:any = useState();
    const [courts, setCourts]: any = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Executa ambas as requisições em paralelo
                const [arenaResponse, courtsResponse] = await Promise.all([
                    axios.get('https://api2.lspr.dev/api/arenas/1'),
                    axios.get('https://api2.lspr.dev/api/courts/arena/1')
                ]);

                // Atualiza o estado da arena
                setArena(arenaResponse.data.data);
                console.log(arenaResponse.data);

                // Atualiza o estado das quadras
                const courts = courtsResponse.data.data.map((court: any) => court.name);
                setCourts(courts);
                console.log(courtsResponse.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='h-screen justify-center content-center'>
            <Card className="w-full max-w-4xl mx-auto">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/3 space-y-4">
                            {loading ? (
                                <div className='flex h-full justify-center items-center'>
                                    <LoaderSpinner size="md" />
                                </div>
                            ) : (
                                <>
                                    {arena && (
                                        <div className="flex items-center space-x-4">
                                            {arena.img ? (
                                                <img
                                                    src={`${arena.img}?height=50&width=50`}
                                                    alt="Beachville logo"
                                                    className="w-12 h-12 rounded"
                                                />
                                            ) : (
                                                <LoaderSpinner size="sm" />
                                            )}
                                            <div>
                                                <h2 className="font-bold text-lg">{arena.name}</h2>
                                                <p className="text-sm text-gray-600">{arena.description}</p>
                                            </div>
                                        </div>
                                    )}
                                    {arena && (
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <p>{arena.address}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <Phone className="w-4 h-4 mr-2" />
                                                <p>{arena.phone}</p>
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="font-semibold mb-2">QUADRAS DISPONÍVEIS</h3>
                                        <div className="space-y-2">
                                            {courts && courts.length > 0 ? (
                                                courts.map((court: any) => (
                                                    <Button key={court} variant="outline" className="w-full justify-start"
                                                        onClick={() => setSelectedCourt(court)}
                                                        >
                                                        {court}
                                                    </Button>
                                                ))
                                            ) : (
                                                <p>Sem quadras disponíveis no momento.</p>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="w-full md:w-2/3 space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    { loading ? (
                                        null
                                    ) : (
                                        <Select value={selectedCourt} onValueChange={setSelectedCourt}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Selecione a quadra" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {courts.map((court: any) => (
                                                    <SelectItem key={court} value={court}>
                                                        {court}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                    <div className='flex ml-2 mt-3'>
                                        <p className="font-semibold mb-2">Setembro</p>
                                        <p className='ml-2'>2024</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant="outline" size="icon">
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            {CalendarComponent()}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <span className="flex items-center justify-center my-8">
                <CalendarDays size={29} className="text-white" />
                <h1 className={`${bebasNeue.className} text-white text-2xl mx-1`}>Arena Já</h1>
            </span>
        </div>
    )
}