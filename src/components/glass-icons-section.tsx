"use client";

import GlassIcons, {GlassIconsItem} from "@/components/glass-icons";
import {useQueryState} from "nuqs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface GlassIconsSectionProps {
    items: GlassIconsItem[];
}

interface DialogContentData {
    title: string;
    description: string;
    details: string;
    video: string;
}

type MechanicType = "combat" | "survival" | "extraction" | "baseManagement";

const contentMapping: Record<MechanicType, DialogContentData> = {

    combat: {

        title: "Combate",

        description: "Enfrente zumbis em combates corpo a corpo e tiroteios táticos.",

        details: `
        O combate em Zumbizus é brutal e estratégico. Você pode alternar entre armas brancas e armas de fogo, 
        cada uma com vantagens e riscos diferentes.
        
        Ataques corpo a corpo economizam munição, mas exigem proximidade e precisão. 
        Armas de fogo oferecem controle de área e dano rápido, porém fazem barulho, atraindo mais ameaças.
        
        O posicionamento, gerenciamento de stamina e escolha do equipamento certo 
        definem se você sobrevive ou vira mais um corpo no mapa.
        `,

        video: "combat_video.mp4"
    },

    survival: {

        title: "Sobrevivência",

        description: "Gerencie fome, sede e recursos em um mundo hostil.",

        details: `
        Sobreviver vai além de matar zumbis. Você precisa manter seus níveis de fome e sede sob controle, 
        coletar suprimentos e decidir o que vale a pena carregar.
        
        Cada expedição exige planejamento: espaço no inventário é limitado, 
        e cada item pode significar vida ou morte.
        
        Crafting permite transformar recursos encontrados em ferramentas, 
        consumíveis e melhorias essenciais para continuar explorando.
        `,

        video: "survival_video.mp4"
    },

    extraction: {

        title: "Extração",

        description: "Entre, saqueie e escape antes que seja tarde.",

        details: `
        As missões seguem o estilo extração: você entra no mapa para coletar recursos valiosos 
        e precisa alcançar uma zona de saída para manter tudo o que conseguiu.
        
        Morrer antes de extrair significa perder loot, 
        tornando cada decisão dentro da missão ainda mais arriscada.
        `,

        video: "extraction_video.mp4"
    },

    baseManagement: {

        title: "Gestão de Base",

        description: "Expanda, fortaleça e administre sua zona segura.",

        details: `
        A base é sua zona segura, o único local livre de ameaças diretas.
        
        Aqui você constrói mobílias, instala estações de crafting, 
        organiza armazenamento e fortalece suas defesas.
        
        Melhorias estruturais liberam novas possibilidades estratégicas, 
        como produção de recursos, suporte de NPCs e preparação avançada para expedições.
        
        Uma base bem administrada aumenta drasticamente suas chances de sobreviver a longo prazo.
        `,

        video: "base_video.mp4"
    }

};

export default function GlassIconsSection({items}: GlassIconsSectionProps) {
    const [selectedMechanic, setSelectedMechanic] = useQueryState('selectedMechanic');

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setSelectedMechanic(null);
        }
    };

    const content = selectedMechanic ? contentMapping[selectedMechanic as MechanicType] : null;

    return (
        <div className="py-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-4">
                Mecânicas do Jogo
            </h2>

            <GlassIcons
                items={items}
                onSelect={(value: string) => setSelectedMechanic(value)}
                className="max-w-2xl"
            />

            <Dialog open={!!selectedMechanic} onOpenChange={handleOpenChange}>
                <DialogContent>
                    {content && (
                        <DialogHeader>
                            <DialogTitle>{content.title}</DialogTitle>
                            <DialogDescription>{content.description}</DialogDescription>
                        </DialogHeader>
                    )}
                    {content && (
                        <video
                            src={'/videos/' + content.video}
                            controls
                            autoPlay
                            muted
                            className="w-full rounded-lg"
                        />
                    )}
                    {content && (
                        <div className="text-sm text-foreground whitespace-pre-line">
                            {content.details.trim()}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}