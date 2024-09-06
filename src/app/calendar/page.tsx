"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, ChevronLeft, ChevronRight } from "lucide-react"

const courts = ["QUADRA 1", "QUADRA 2", "QUADRA 3", "QUADRA 4", "QUADRA 5"]

export default function BookingInterface() {
    const [selectedMonth, setSelectedMonth] = useState("Quadra 1")

    const renderCalendar = () => {
        const days = Array.from({ length: 31 }, (_, i) => i + 1)
        const weekdays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']

        return (
            <div className="grid grid-cols-7 gap-2">
                {weekdays.map(day => (
                    <div key={day} className="text-center font-semibold">{day}</div>
                ))}
                {days.map(day => (
                    <Button
                        key={day}
                        variant={day >= 15 && day <= 31 ? "secondary" : "ghost"}
                        className={`w-full bg-gray-100 pt-6 pb-6 hover:bg-gray-300`}
                    >
                        {day}
                    </Button>
                ))}
            </div>
        )
    }

    return (
        <div className='h-screen justify-center content-center'>
            <Card className="w-full max-w-4xl mx-auto">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/3 space-y-4">
                            <div className="flex items-center space-x-4">
                                <img src="/beachville.png?height=50&width=50" alt="Beachville logo" className="w-12 h-12 rounded" />
                                <div>
                                    <h2 className="font-bold text-lg">BEACHVILLE</h2>
                                    <p className="text-sm text-gray-600">ESPORTES DE AREIA</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <p>R. Mal. Deodoro, 106 - Centro, Joinville - SC, 89201-203</p>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-2" />
                                    <p>(47) 99761-7568</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">QUADRAS DISPONÍVEIS</h3>
                                <div className="space-y-2">
                                    {courts.map(court => (
                                        <Button key={court} variant="outline" className="w-full justify-start">
                                            {court}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-2/3 space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Selecione a quadra" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Quadra 1">Quadra 1</SelectItem>
                                            <SelectItem value="Quadra 2">Quadra 2</SelectItem>
                                            <SelectItem value="Quadra 3">Quadra 3</SelectItem>
                                            <SelectItem value="Quadra 4">Quadra 4</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className='flex ml-2 mt-3'>
                                        <p className="font-semibold mb-2">Agosto</p>
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
                            {renderCalendar()}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}