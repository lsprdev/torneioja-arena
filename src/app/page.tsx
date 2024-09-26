'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import LoaderSpinner from "@/components/loader-spinner";

export default function Home() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleClicked = () => {
    setLoading(true);
    toast({
      variant: "default",
      title: 'Sucesso!',
      description: 'Você clicou no botão! Vamos começar!',
      className: 'bg-green-600 text-white border-solid border-1',
    });

    setTimeout(() => {
      setLoading(false);
      window.location.href = '/calendar';
    }, 2000);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button
        variant="secondary"
        className="px-8 py-4"
        onClick={() => handleClicked()}>
        {loading ? <LoaderSpinner size="sm"/> : "Clique aqui!"}
      </Button >
    </div>
  );
}