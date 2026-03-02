export default function Header() {
    return (
        <header className="w-full py-5">
            <div className="container mx-auto flex h-16 items-center px-4">
                <nav className="absolute left-1/2 -translate-x-1/2 flex gap-6">
                    <a href="#"
                       className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-target">
                        Home
                    </a>
                    <a href="#"
                       className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-target">
                        Participe
                    </a>
                </nav>
            </div>
        </header>
    )
}