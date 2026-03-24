"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gender, HairOption, NpcWithRejections, SkinColor } from "@/types/npc.types";
import { toast } from "sonner";
import { saveNpc } from "@/lib/actions/npc.actions";
import { StepCard } from "@/components/step-card";
import { StepNav } from "@/components/step-nav";
import { SummaryRow } from "@/components/summary-row";
import { Hammer, type LucideIcon, Package, Shield, ShoppingCart } from "lucide-react";

interface CharacterCreationSectionProps {
  npc: NpcWithRejections | null;
}

export const SkinColorLabel: Record<SkinColor, string> = {
  [SkinColor.CLARO]: "Claro",
  [SkinColor.PESSEGO]: "Pêssego",
  [SkinColor.BEGE]: "Bege",
  [SkinColor.MORENO]: "Moreno",
  [SkinColor.CASTANHO]: "Castanho",
  [SkinColor.ESCURO]: "Escuro",
  [SkinColor.EBANO]: "Ébano",
};

const GENDER_OPTIONS = [
  { label: "Masculino", value: "male", icon: "♂" },
  { label: "Feminino", value: "female", icon: "♀" },
  { label: "Outro", value: "other", icon: "⚧" },
] as const;

const HAIR_COLORS = [
  { name: "Preto", value: "#1a1a1a" },
  { name: "Castanho Escuro", value: "#3d2314" },
  { name: "Castanho", value: "#6b4423" },
  { name: "Castanho Claro", value: "#8b6914" },
  { name: "Loiro", value: "#d4a017" },
  { name: "Loiro Platinado", value: "#e8d5b7" },
  { name: "Ruivo", value: "#8b2500" },
  { name: "Vermelho", value: "#c41e3a" },
  { name: "Rosa", value: "#ff69b4" },
  { name: "Azul", value: "#4169e1" },
  { name: "Verde", value: "#228b22" },
  { name: "Roxo", value: "#8b008b" },
  { name: "Branco", value: "#f5f5f5" },
  { name: "Cinza", value: "#808080" },
] as const;

const HAIR_OPTIONS: { label: string; value: HairOption }[] = [
  { label: "Careca", value: HairOption.bald },
  { label: "Raspado", value: HairOption.buzzCut },
  { label: "Topete", value: HairOption.quiff },
  { label: "Chanel", value: HairOption.bobCut },
  { label: "Liso Curto", value: HairOption.shortStraight },
  { label: "Liso Longo", value: HairOption.longStraight },
  { label: "Ondulado Curto", value: HairOption.shortWavy },
  { label: "Ondulado Longo", value: HairOption.longWavy },
  { label: "Cacheado Curto", value: HairOption.shortCurly },
  { label: "Cacheado Longo", value: HairOption.longCurly },
  { label: "Afro", value: HairOption.afro },
  { label: "Rabo de Cavalo", value: HairOption.ponytail },
  { label: "Tranças", value: HairOption.braids },
  { label: "Dreads", value: HairOption.dreadlocks },
  { label: "Moicano", value: HairOption.mohawk },
];

const validCategories = ["production", "supplies", "defense", "commerce"] as const;
type NpcCategory = (typeof validCategories)[number];

const CATEGORY_OPTIONS: {
  label: string;
  value: NpcCategory;
  icon: LucideIcon;
  description: string;
}[] = [
  {
    label: "Produção",
    value: "production",
    icon: Hammer,
    description: "Criação, fabricação e processamento de itens e recursos",
  },
  {
    label: "Suprimentos",
    value: "supplies",
    icon: Package,
    description: "Responsáveis pelo armazenamento e distribuição de materiais",
  },
  {
    label: "Defesa",
    value: "defense",
    icon: Shield,
    description: "Guardiões e combatentes que protegem a comunidade",
  },
  {
    label: "Comércio",
    value: "commerce",
    icon: ShoppingCart,
    description: "Negociantes e mercadores que movimentam a economia",
  },
];

const STEPS = ["Gênero", "Pele", "Cabelo", "Categoria", "Nome", "Confirmação"];
const TOTAL_STEPS = STEPS.length;

export default function CharacterCreationSection({ npc }: CharacterCreationSectionProps) {
  const [selectedGender, setSelectedGender] = useState<Gender>(() => npc?.gender ?? Gender.male);
  const [selectedSkinColor, setSelectedSkinColor] = useState<string>(() => npc?.skinColor ?? SkinColor.CLARO);
  const [selectedHairOption, setSelectedHairOption] = useState<HairOption>(() => npc?.hairOption ?? HairOption.none);
  const [selectedHairColor, setSelectedHairColor] = useState<string>(() => npc?.hairColor ?? HAIR_COLORS[0].value);
  const [selectedCategory, setSelectedCategory] = useState<NpcCategory>("production");
  const [characterName, setCharacterName] = useState<string>(() => npc?.name ?? "");
  const [isCompleted, setIsCompleted] = useState<boolean>(() => npc !== null);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const stepRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const needsHairColor = selectedHairOption !== "none" && selectedHairOption !== "bald";
  const progress = Math.round((currentStep / TOTAL_STEPS) * 100);

  const advanceTo = (step: number) => {
    setCurrentStep(step);
    setTimeout(() => stepRefs[step - 1].current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  };

  const handleConfirm = async () => {
    if (characterName.length < 3 || characterName.length > 30) {
      toast.error("Nome deve ter entre 3 e 30 caracteres");
      return;
    }

    try {
      const result = await saveNpc(
        characterName,
        selectedGender,
        selectedSkinColor as SkinColor,
        selectedHairOption,
        selectedHairColor,
        selectedCategory
      );

      if ("error" in result) {
        const mappedErrors: Record<string, string> = {
          INVALID_HAIR_COLOR: "Cor de cabelo inválida",
          INVALID_CHARACTER_NAME: "Nome deve ter entre 3 e 30 caracteres",
          CHARACTER_NAME_TAKEN: "Nome já está em uso, escolha outro",
          INVALID_CATEGORY: "Categoria inválida",
        };
        toast.error(mappedErrors[result.error] || "Erro ao salvar o personagem");
        return;
      }

      toast.success("Personagem salvo com sucesso!");
      setIsCompleted(true);
    } catch {
      toast.error("Ocorreu um erro ao salvar seu personagem. Tente novamente.");
    }
  };

  const handleEdit = () => {
    setIsCompleted(false);
    setCurrentStep(1);
    setTimeout(() => stepRefs[0].current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  };

  if (isCompleted) {
    const categoryOption = CATEGORY_OPTIONS.find((c) => c.value === selectedCategory);

    return (
      <div className="flex flex-col gap-8 p-8 rounded-2xl border border-border bg-card/50 shadow-xl w-full max-w-2xl">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-2xl font-bold">Personagem Criado!</h2>
          <p className="text-sm text-muted-foreground">Confira os detalhes do seu personagem abaixo</p>
        </div>

        <div className="text-center">
          <span className="text-3xl font-bold text-primary">{characterName || "Sem nome"}</span>
        </div>

        <div className="flex flex-col gap-4 p-4 rounded-lg border border-border bg-card">
          <SummaryRow label="Gênero" value={GENDER_OPTIONS.find((g) => g.value === selectedGender)?.label} />
          <SummaryRow label="Cabelo" value={HAIR_OPTIONS.find((h) => h.value === selectedHairOption)?.label} />
          {needsHairColor && (
            <SummaryRow
              label="Cor do Cabelo"
              value={HAIR_COLORS.find((c) => c.value === selectedHairColor)?.name}
              swatch={selectedHairColor}
            />
          )}
          <SummaryRow
            label="Cor de Pele"
            value={SkinColorLabel[selectedSkinColor as SkinColor]}
            swatch={selectedSkinColor}
          />
          {categoryOption && (
            <SummaryRow
              label="Categoria"
              value={categoryOption.label}
              icon={<categoryOption.icon size={14} strokeWidth={1.5} className="text-muted-foreground" />}
            />
          )}
        </div>

        <Button onClick={handleEdit} variant="outline" className="w-full cursor-target cursor-none">
          Editar Personagem
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <div className="sticky top-4 z-10 flex flex-col gap-2 bg-background/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-border shadow-sm">
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>{STEPS[currentStep - 1]}</span>
          <span>
            {currentStep} de {TOTAL_STEPS}
          </span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <div className="flex flex-col gap-4">
        <StepCard ref={stepRefs[0]} stepNumber={1} currentStep={currentStep} title="Escolha seu Gênero">
          <div className="flex flex-wrap justify-center gap-3">
            {GENDER_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSelectedGender(option.value as Gender);
                  if (currentStep === 1) advanceTo(2);
                }}
                className={`flex items-center gap-2 px-6 py-4 rounded-lg border text-sm font-medium transition-all cursor-none cursor-target
                  ${
                    selectedGender === option.value
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
              >
                <span className="text-2xl">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
          {currentStep > 1 && <StepNav onNext={() => advanceTo(2)} />}
        </StepCard>

        <StepCard ref={stepRefs[1]} stepNumber={2} currentStep={currentStep} title="Escolha sua Cor de Pele">
          <div className="flex flex-wrap justify-center gap-3">
            {Object.values(SkinColor).map((color) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedSkinColor(color);
                  if (currentStep === 2) advanceTo(3);
                }}
                title={SkinColorLabel[color]}
                className={`w-12 h-12 rounded-full border-2 transition-all cursor-target cursor-none hover:scale-110 hover:shadow-md
                  ${selectedSkinColor === color ? "border-primary ring-2 ring-primary/40 scale-110" : "border-border"}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">{SkinColorLabel[selectedSkinColor as SkinColor]}</p>
          <StepNav onBack={() => advanceTo(1)} onNext={() => advanceTo(3)} />
        </StepCard>

        <StepCard ref={stepRefs[2]} stepNumber={3} currentStep={currentStep} title="Escolha seu Cabelo">
          <div className="flex flex-wrap justify-center gap-2 max-h-44 overflow-y-auto pr-1">
            {HAIR_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedHairOption(option.value)}
                className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all cursor-target cursor-none
                  ${
                    selectedHairOption === option.value
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {needsHairColor && (
            <div className="flex flex-col gap-2 pt-2">
              <p className="text-xs text-muted-foreground text-center">Cor do cabelo</p>
              <div className="flex flex-wrap justify-center gap-2">
                {HAIR_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedHairColor(color.value)}
                    title={color.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all cursor-target cursor-none hover:scale-110 hover:shadow-md
                      ${
                        selectedHairColor === color.value
                          ? "border-primary ring-2 ring-primary/40 scale-110"
                          : "border-border"
                      }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {HAIR_COLORS.find((c) => c.value === selectedHairColor)?.name}
              </p>
            </div>
          )}

          <StepNav onBack={() => advanceTo(2)} onNext={() => advanceTo(4)} />
        </StepCard>

        <StepCard ref={stepRefs[3]} stepNumber={4} currentStep={currentStep} title="Categoria do NPC">
          <p className="text-sm text-muted-foreground text-center">Qual será o papel deste personagem na comunidade?</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CATEGORY_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedCategory === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    setSelectedCategory(option.value);
                    if (currentStep === 4) advanceTo(5);
                  }}
                  className={`group flex flex-col items-center gap-2 px-4 py-5 rounded-xl border-2 transition-all duration-200 cursor-none cursor-target
                  ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                      : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  <Icon
                    className={`transition-all duration-200 group-hover:scale-110 ${
                      isSelected ? "scale-110 text-primary" : "text-muted-foreground"
                    }`}
                    size={36}
                    strokeWidth={1.5}
                  />
                  <span className={`text-sm font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>
                    {option.label}
                  </span>
                  <span className="text-xs text-muted-foreground text-center leading-snug">{option.description}</span>

                  {isSelected && (
                    <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium text-primary bg-primary/15 px-2 py-0.5 rounded-full">
                      ✓ Selecionado
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <StepNav onBack={() => advanceTo(3)} onNext={() => advanceTo(5)} />
        </StepCard>

        <StepCard ref={stepRefs[4]} stepNumber={5} currentStep={currentStep} title="Nome do Personagem">
          <p className="text-sm text-muted-foreground text-center">Entre 3 e 30 caracteres</p>
          <input
            type="text"
            maxLength={30}
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            placeholder="Digite o nome do seu personagem"
            className="cursor-target cursor-none w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
          <p className="text-xs text-muted-foreground text-right">{characterName.length}/30</p>
          <StepNav
            onBack={() => advanceTo(4)}
            onNext={() => {
              if (characterName.length < 3) {
                toast.error("Nome deve ter pelo menos 3 caracteres");
                return;
              }
              advanceTo(6);
            }}
          />
        </StepCard>

        <StepCard ref={stepRefs[5]} stepNumber={6} currentStep={currentStep} title="Confirmar Personagem">
          <div className="flex flex-col gap-3 p-4 rounded-lg border border-border bg-card/50">
            <SummaryRow label="Nome" value={characterName} />
            <SummaryRow label="Gênero" value={GENDER_OPTIONS.find((g) => g.value === selectedGender)?.label} />
            <SummaryRow label="Cabelo" value={HAIR_OPTIONS.find((h) => h.value === selectedHairOption)?.label} />
            {needsHairColor && (
              <SummaryRow
                label="Cor do Cabelo"
                value={HAIR_COLORS.find((c) => c.value === selectedHairColor)?.name}
                swatch={selectedHairColor}
              />
            )}
            <SummaryRow
              label="Cor de Pele"
              value={SkinColorLabel[selectedSkinColor as SkinColor]}
              swatch={selectedSkinColor}
            />
            {(() => {
              const cat = CATEGORY_OPTIONS.find((c) => c.value === selectedCategory);
              return cat ? (
                <SummaryRow
                  label="Categoria"
                  value={cat.label}
                  icon={<cat.icon size={14} strokeWidth={1.5} className="text-muted-foreground" />}
                />
              ) : null;
            })()}
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1 cursor-target cursor-none" onClick={() => advanceTo(5)}>
              Voltar
            </Button>
            <Button className="flex-1 cursor-target cursor-none" onClick={handleConfirm}>
              Confirmar
            </Button>
          </div>
        </StepCard>
      </div>
    </div>
  );
}
