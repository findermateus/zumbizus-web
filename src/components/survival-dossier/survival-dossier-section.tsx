"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import DossierCard, { DossierCardData } from "./dossier-card";
import DossierNav from "./dossier-nav";
import { Building2, Heart, PackageOpen, Swords } from "lucide-react";

const dossierData: DossierCardData[] = [
  {
    value: "combat",
    icon: Swords,
    title: "Combate",
    description: "Enfrente zumbis em combates corpo a corpo e tiroteios táticos.",
    details: `O combate em Zumbizus é brutal e estratégico. Você pode alternar entre armas brancas e armas de fogo, cada uma com vantagens e riscos diferentes. Ataques corpo a corpo economizam munição, mas exigem proximidade e precisão. Armas de fogo oferecem controle de área e dano rápido, porém fazem barulho, atraindo mais ameaças. O posicionamento, gerenciamento de stamina e escolha do equipamento certo definem se você sobrevive ou vira mais um corpo no mapa.`,
    video: "combat_video.mp4",
  },
  {
    value: "extraction",
    icon: PackageOpen,
    title: "Extração",
    description: "Entre, saqueie e escape antes que seja tarde.",
    details: `As missões seguem o estilo extração: você entra no mapa para coletar recursos valiosos e precisa alcançar uma zona de saída para manter tudo o que conseguiu. Morrer antes de extrair significa perder o loot, tornando cada decisão dentro da missão ainda mais arriscada.`,
    video: "extraction_video.mp4",
  },
  {
    value: "baseManagement",
    icon: Building2,
    title: "Gestão de Base",
    description: "Expanda, fortaleça e administre sua zona segura.",
    details: `A base é sua zona segura, o único local livre de ameaças diretas. Aqui você constrói mobílias, instala estações de crafting, organiza armazenamento e fortalece suas defesas. Melhorias estruturais liberam novas possibilidades estratégicas, como produção de recursos, suporte de NPCs e preparação avançada para expedições. Uma base bem administrada aumenta drasticamente suas chances de sobreviver a longo prazo.`,
    video: "base_video.mp4",
  },
  {
    value: "survival",
    icon: Heart,
    title: "Sobrevivência",
    description: "Gerencie fome, sede e recursos em um mundo hostil.",
    details: `Sobreviver vai além de matar zumbis. Você precisa manter seus níveis de fome e sede sob controle, coletar suprimentos e decidir o que vale a pena carregar. Cada expedição exige planejamento: espaço no inventário é limitado, e cada item pode significar vida ou morte. Crafting permite transformar recursos encontrados em ferramentas, consumíveis e melhorias essenciais para continuar explorando.`,
    video: "survival_video.mp4",
  },
];

export default function SurvivalDossierSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.round(latest * (dossierData.length - 1));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const scrollToSection = (index: number) => {
    if (!targetRef.current) return;
    const target = targetRef.current;

    const start = target.offsetTop;
    const scrollDistance = target.offsetHeight - window.innerHeight;
    const targetY = start + (scrollDistance * index) / (dossierData.length - 1);

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <section ref={targetRef} className="relative h-[400vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <motion.div style={{ x }} className="flex h-full w-[400vw]">
          {dossierData.map((data, index) => (
            <div key={data.value} className="relative h-full w-screen flex-shrink-0 br-1">
              <DossierCard data={data} isActive={index === activeIndex} />
            </div>
          ))}
        </motion.div>

        <DossierNav
          items={dossierData.map((item) => ({ value: item.value, icon: item.icon, title: item.title }))}
          activeIndex={activeIndex}
          onSelect={scrollToSection}
        />
      </div>
    </section>
  );
}
