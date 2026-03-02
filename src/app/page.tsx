export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        Bem-vindo ao {" "}
                        <span className="text-primary inline-block animate-pulse">{" "} Zumbizus</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Work In progress
                    </p>
                </div>
            </main>
        </div>
    );
}
