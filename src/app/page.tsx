export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-24">
                <div className="mx-auto max-w-5xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        Bem-vindo ao {" "}
                        <span
                            className="text-primary inline-block bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_2s_linear_infinite]">
                          Zumbizus
                        </span>
                    </h1>

                    <section className="flex flex-col items-center mt-12">
                        <div className="max-w-2xl text-center space-y-6">
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Lidere um grupo de sobreviventes em um
                                cenário devastado,
                                enfrente hordas de zumbis e
                                lute contra o tempo para manter sua base viva.
                                Colete recursos, administre pessoas e
                                tome decisões difíceis em um jogo
                                top-down de sobrevivência tenso e desafiador.
                                <span className="text-primary font-bold"> Você está preparado para comandar o fim do mundo</span>?
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}