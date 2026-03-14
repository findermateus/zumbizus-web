"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background flex items-center justify-center px-4 mt-60">
      <div className="flex flex-col items-center gap-10 w-full max-w-lg text-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
          <div className="relative flex items-center justify-center w-20 h-20 rounded-full border border-border bg-card/50">
            <AlertTriangle className="w-9 h-9 text-primary" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="inline-block bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer">
              Algo deu errado
            </span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Sentimos muito. Um erro inesperado aconteceu e não conseguimos completar sua solicitação.
          </p>
        </div>

        <Separator />

        {error.digest && (
          <p className="text-xs text-muted-foreground/50 font-mono tracking-widest uppercase">código: {error.digest}</p>
        )}

        <div className="flex items-center gap-4">
          <Button variant="outline" className="w-full sm:w-auto gap-2" onClick={reset}>
            <RotateCcw className="w-4 h-4" />
            Tentar novamente
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full" size="lg">
              Voltar ao início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
