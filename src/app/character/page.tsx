import { auth } from "@/auth";
import LoginSection from "@/components/login-section";
import CharacterCreationSection from "@/components/character-creation-section";
import { Suspense } from "react";
import { loadNpc } from "@/lib/npc";
import { Spinner } from "@/components/ui/spinner";
import { Eye, Scale, ShieldCheck, Sparkles, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

async function LoadSection() {
  const session = await auth();

  if (!session) {
    return <LoginSection />;
  }

  const npc = await loadNpc(session);

  return <CharacterCreationSection npc={npc} />;
}

const rules = [
  {
    id: 0,
    icon: Eye,
    text: "Seu personagem será visível no jogo de outros jogadores",
  },
  {
    id: 1,
    icon: Trash2,
    text: "Você pode solicitar remoção do NPC, mas ele não pode ser removido de saves já existentes",
  },
  {
    id: 2,
    icon: ShieldCheck,
    text: "Seu personagem será avaliado para evitar nomes ou descrições ofensivas, caso reprovado, você poderá escolher outro nome",
  },
];

export default async function Page() {
  return (
    <div className="flex flex-col items-center gap-10 w-full mt-12">
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="inline-block bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer">
          Criação de Personagem
        </span>
      </h1>
      <Suspense fallback={<Spinner className="w-10 h-10 mt-10" />}>
        <LoadSection />
      </Suspense>
      <section className="w-full max-w-5xl mx-auto flex flex-col gap-8 py-10 px-4">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <Badge variant="outline" className="tracking-widest text-xs uppercase px-4 py-1">
            Apoiadores
          </Badge>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <Sparkles className="text-primary mt-1 shrink-0" size={20} />
              <h2 className="text-2xl font-semibold tracking-tight">Como Funciona</h2>
            </div>

            <Separator />

            <p className="text-muted-foreground leading-relaxed text-sm">
              Ao se cadastrar e apoiar o projeto, você poderá criar um{" "}
              <span className="text-foreground font-medium">NPC personalizado</span> que será incluído no jogo.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Além disso, terá uma{" "}
              <span className="text-foreground font-medium">chance aleatória de ganhar uma key</span> do jogo próximo ao
              lançamento.
            </p>
          </div>

          <div className="p-8 md:p-12 flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <Scale className="text-primary mt-1 shrink-0" size={20} />
              <h2 className="text-2xl font-semibold tracking-tight">Regras</h2>
            </div>

            <Separator />

            <ul className="flex flex-col gap-3">
              {rules.map((rule) => {
                const Icon = rule.icon;
                return (
                  <li
                    key={rule.id}
                    className="cursor-target group flex items-start gap-4 p-4 rounded-md border border-border bg-muted/30 hover:border-primary/40 hover:bg-primary/5 transition-colors duration-200 cursor-default"
                  >
                    <Icon
                      size={15}
                      className="shrink-0 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors duration-200"
                    />
                    <span className="text-muted-foreground text-sm leading-relaxed">{rule.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-muted-foreground text-xs tracking-widest uppercase">Eternize sua presença</span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </section>
    </div>
  );
}
