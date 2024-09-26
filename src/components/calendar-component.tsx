import { useState } from 'react';
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
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

const CalendarComponent = () => {
    const { toast } = useToast();

    const [open, setOpen] = useState(false); // State to control the AlertDialog
    const [selectedDay, setSelectedDay] = useState<number | null>(null); // State to track selected day

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
                            // add diferent styles to the button
                            className='bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80'
                            onClick={()=> handleContinue()}>
                            Continuar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default CalendarComponent;
