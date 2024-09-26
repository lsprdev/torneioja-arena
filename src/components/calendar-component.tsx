import { useEffect, useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import convertToISO from '@/lib/convert-to-time';
import { jwtDecode } from "jwt-decode";

const schedules = [
    { id: '1', time: '08:00 - 09:00' },
    { id: '2', time: '09:00 - 10:00' },
    { id: '3', time: '10:00 - 11:00' },
    { id: '4', time: '11:00 - 12:00' },
    { id: '5', time: '12:00 - 13:00' }
]

const CalendarComponent = () => {
    const { toast } = useToast();

    const [open, setOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const arenaId = 1
    const userId = jwtDecode(localStorage.getItem('arena_token') as string);

    const handleConfirm = () => {
        const specificDate = `2024-09-${selectedDay}`;
        console.log('Agendamento confirmado para o dia:', specificDate);

        const finalList = selectedRows.map((row) => {
            const schedule:any = schedules.find((schedule) => schedule.id === row);
            const { initTime, endTime } = convertToISO(schedule.time, specificDate);
            return { ...schedule, initTime, endTime };
        });

        console.log('UserId:', userId);
        console.log('ArenaId:', arenaId);

        console.log('Horários selecionados:', finalList);
    }


    const toggleRow = (id: string) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
        )
    }

    const toggleAll = () => {
        setSelectedRows((prev) =>
            prev.length === schedules.length ? [] : schedules.map((schedule) => schedule.id)
        )
    }

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem('arena_token') !== null);
    }, []);

    const handleContinue = () => {
        setOpen(false);
        toast({
            variant: "default",
            title: 'Ok!',
            description: 'Você será redirecionado para a página de registro em alguns instantes.',
            className: 'bg-green-600 text-white border-solid border-1',
        });

        setTimeout(() => {
            window.location.href = '/register';
        }, 2000);
    }
    const renderCalendar = () => {
        const days = Array.from({ length: 30 }, (_, i) => i + 1);
        const weekdays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

        const handleClick = (day: number) => {
            setSelectedDay(day);
            console.log(selectedDay);
            setOpen(true);
        };

        return (
            <div className="grid grid-cols-7 gap-2">
                {weekdays.map(day => (
                    <div key={day} className="text-center font-semibold">{day}</div>
                ))}
                {days.map(day => (
                    <Button
                        key={day}
                        variant={day >= 15 && day <= 31 ? "secondary" : "ghost"}
                        className="w-full bg-gray-100 pt-6 pb-6 hover:bg-gray-300"
                        onClick={() => handleClick(day)}>
                        {day}
                    </Button>
                ))}
            </div>
        );
    };

    return (
        <>
            {renderCalendar()}
            {isAuthenticated ? (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent 
                        className="w-full max-w-md mx-auto space-y-4 p-4 bg-black text-white border border-zinc-800"
                        onInteractOutside={(e) => {
                            e.preventDefault();
                        }}
                        >
                        <DialogHeader>
                            <DialogTitle>Horários disponíveis</DialogTitle>
                            <DialogDescription>
                                Selecione os horários que deseja reservar.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="border border-zinc-800 rounded-md ">
                            <Table>
                                <TableHeader>
                                    <TableRow className='border border-zinc-800'>
                                        <TableHead className="w-[40px]">
                                            <Checkbox
                                                checked={selectedRows.length === schedules.length}
                                                onCheckedChange={toggleAll}
                                            />
                                        </TableHead>
                                        <TableHead className='text-white'>Horários</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {schedules.map((schedule) => (
                                        <TableRow key={schedule.id} className='border border-zinc-800'>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedRows.includes(schedule.id)}
                                                    onCheckedChange={() => toggleRow(schedule.id)}
                                                />
                                            </TableCell>
                                            <TableCell>{schedule.time}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex items-center justify-end">
                            <div className="space-x-2">
                                <Button 
                                    size="sm"
                                    onClick={() => setOpen(false)}
                                    className="border border-zinc-800 hover:bg-zinc-800 hover:text-white">
                                    Cancelar
                                </Button>
                                <Button 
                                    size="sm" 
                                    onClick={() => handleConfirm()}
                                    className="bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80">
                                    Confirmar agendamento
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            ) : (
                <>
                    <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogContent className='border border-zinc-800'>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Você ainda não tem uma conta.</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Para continuar, você precisa criar uma conta. Deseja continuar?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel 
                                    className='border border-zinc-800 hover:bg-zinc-800 hover:text-white'
                                    onClick={() => setOpen(false)}> 
                                    Cancelar
                                </AlertDialogCancel>
                                <AlertDialogAction 
                                    className='bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80'
                                    onClick={()=> handleContinue()}>
                                    Continuar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
                )}
        </>
    );
};


export default CalendarComponent;

