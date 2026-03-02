"use client";

import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Check, Copy} from "lucide-react";

export default function Footer() {
    const [copied, setCopied] = useState(false);
    const email = "contact@zumbizus.com";

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Falha ao copiar:", err);
        }
    };

    return (
        <footer className="border-t border-border bg-muted/50">
            <div
                className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
                <p className="text-sm text-muted-foreground">
                    © 2026 Zumbizus. Todos os direitos reservados.
                </p>
                <div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-target gap-2"
                        onClick={handleCopyEmail}
                    >
                        {copied ? (
                            <>
                                <Check className="h-4 w-4 text-primary"/>
                                <span className="text-primary text-left">Copiado!</span>
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4"/>
                                {email}
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </footer>
    )
}