"use client";

import { Npc, NpcRejection } from "@/generated/prisma/client";

interface CharacterCreationSectionProps {
  npc: (Npc & { npcRejections: NpcRejection[] }) | null;
}

export default function CharacterCreationSection({ npc }: CharacterCreationSectionProps) {
  return (
    <div>
      <h1>Criação de Personagem</h1>
      <p>Essa é a criação de personagem.</p>
      <p>{npc?.name ?? "Escolha o nome"}</p>
    </div>
  );
}
