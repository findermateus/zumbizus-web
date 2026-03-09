import { auth } from "@/auth";
import LoginSection from "@/components/login-section";
import CharacterCreationSection from "@/components/character-creation-section";
import LoadNpc from "@/lib/cases/load-npc";
import NpcDAO from "@/lib/data-access-objects/npc-dao";
import { Suspense } from "react";

async function LoadSection() {
  const session = await auth();

  if (!session) {
    return <LoginSection />;
  }

  const loadNpc = new LoadNpc(new NpcDAO());
  const npc = await loadNpc.execute(session.user.userId);

  return <CharacterCreationSection npc={npc} />;
}

export default async function Page() {
  return (
    <div className="flex flex-col items-center gap-10 w-full mt-12">
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="inline-block bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer">
          Criação de Personagem
        </span>
      </h1>
      <Suspense fallback={<div>Carregando...</div>}>
        <LoadSection />
      </Suspense>
    </div>
  );
}
