"use client";

import Carousel, {CarouselItem} from "@/components/carousel";
import {Building2, Crosshair, Flashlight, Hammer, Heart, PackageOpen, Swords, User} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import GlareHover from "@/components/glare-hover";
import GlassIcons, {GlassIconsItem} from "@/components/glass-icons";
import Link from "next/link";
import GlassIconsSection from "@/components/glass-icons-section";

const carouselItems: CarouselItem[] = [
    {
        title: "Combate Brutal e Punitivo",
        description: "Cada movimento conta e o erro não é uma opção. Sobreviva às hordas ou encare a consequência: se você morrer, perde absolutamente tudo.",
        id: 1,
        icon: <Crosshair className="h-6 w-6 text-primary"/>,
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
    },
    {
        title: "Escassez é a Regra",
        description: "Gerencie seus recursos. Cada bala e cada suprimento pode ser o último.",
        id: 2,
        icon: <Flashlight className="h-6 w-6 text-primary"/>,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80"
    },
    {
        title: "Improvise para Vencer",
        description: "Transforme sucata em ferramentas de destruição e fortifique seu abrigo.",
        id: 3,
        icon: <Hammer className="h-6 w-6 text-primary"/>,
        image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80"
    }
];

const glassIconsItems: GlassIconsItem[] = [
    {
        icon: <Swords className="w-full h-full text-white"/>,
        color: "#1f8e00",
        label: "Combate",
        value: "combat"
    },
    {
        icon: <Heart className="w-full h-full text-white"/>,
        color: "#1f8e00",
        label: "Sobrevivência",
        value: "survival"
    },
    {
        icon: <PackageOpen className="w-full h-full text-white"/>,
        color: "#1f8e00",
        label: "Extração",
        value: "extraction"
    },
    {
        icon: <Building2 className="w-full h-full text-white"/>,
        color: "#1f8e00",
        label: "Gerenciamento de Base",
        value: "baseManagement"
    }
];

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Bem-vindo ao {" "}
                            <span
                                className="text-primary inline-block bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_2s_linear_infinite]">
                              Zumbizus
                            </span>
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="max-w-2xl lg:max-w-none">
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
                        </div>

                        <div className="flex justify-center lg:justify-end">
                            <Carousel
                                items={carouselItems}
                                baseWidth={500}
                                autoplay={true}
                                autoplayDelay={4000}
                                pauseOnHover={true}
                                loop={true}
                            />
                        </div>
                    </div>


                    <Separator className="mt-16"/>

                    <div className="mx-auto max-w-xl py-16">
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <User className="h-12 w-12 text-primary"/>
                            <h2 className="text-3xl font-bold text-foreground">
                                Quer Fazer Parte do Jogo?
                            </h2>
                        </div>

                        <GlareHover
                            width="100%"
                            height="auto"
                            background="hsl(var(--card))"
                            borderRadius="12px"
                            glareColor="#1f8e00"
                            glareOpacity={0.3}
                            className="border"
                        >
                            <Card className="border-0 shadow-none bg-transparent w-full">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-xl">Criação de Personagem</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-center leading-relaxed">
                                        Crie seu próprio personagem e eternize sua presença no mundo de Zumbizus.
                                        Apoie o projeto e transforme-se em um NPC dentro do jogo com nome, aparência e
                                        papel únicos!
                                    </p>
                                </CardContent>
                                <CardFooter className="justify-center">
                                    <Link href="/character">
                                        <Button className="cursor-target" size="lg">
                                            Participe
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </GlareHover>
                    </div>

                    <Separator className="my-16"/>

                    <GlassIconsSection items={glassIconsItems}/>
                </div>
            </main>
        </div>
    );
}