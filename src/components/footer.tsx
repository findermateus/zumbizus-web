import {Button} from "@/components/ui/button";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-muted/50">
            <div
                className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
                <p className="text-sm text-muted-foreground">
                    © 2026 Zumbizus. Todos os direitos reservados.
                </p>
                <div>
                    <Button variant="ghost" size="sm">
                        contact@zumbizus.com
                    </Button>
                </div>
            </div>
        </footer>
    )
}