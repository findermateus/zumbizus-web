"use client";

import { useState } from "react";
import Stepper, { Step } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import type { HairOption, Gender } from "@/types/npc.types";
import { NpcWithRejections, SkinColor } from "@/types/npc.types";

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
  { label: "Careca", value: "bald" },
  { label: "Raspado", value: "buzzCut" },
  { label: "Topete", value: "quiff" },
  { label: "Chanel", value: "bobCut" },
  { label: "Liso Curto", value: "shortStraight" },
  { label: "Liso Longo", value: "longStraight" },
  { label: "Ondulado Curto", value: "shortWavy" },
  { label: "Ondulado Longo", value: "longWavy" },
  { label: "Cacheado Curto", value: "shortCurly" },
  { label: "Cacheado Longo", value: "longCurly" },
  { label: "Afro", value: "afro" },
  { label: "Rabo de Cavalo", value: "ponytail" },
  { label: "Tranças", value: "braids" },
  { label: "Dreads", value: "dreadlocks" },
  { label: "Moicano", value: "mohawk" },
];

export default function CharacterCreationSection({ npc }: CharacterCreationSectionProps) {
  const [selectedGender, setSelectedGender] = useState<Gender>(() => npc?.gender ?? "male");

  const [selectedSkinColor, setSelectedSkinColor] = useState<string>(() => npc?.skinColor ?? SkinColor.CLARO);

  const [selectedHairOption, setSelectedHairOption] = useState<HairOption>(() => npc?.hairOption ?? "none");

  const [selectedHairColor, setSelectedHairColor] = useState<string>(() => npc?.hairColor ?? HAIR_COLORS[0].value);

  const [characterName, setCharacterName] = useState<string>(() => npc?.name ?? "");

  const [isCompleted, setIsCompleted] = useState<boolean>(() => npc !== null);
  const [stepperKey, setStepperKey] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const needsHairColor = selectedHairOption !== "none" && selectedHairOption !== "bald";
  const isLastStep = currentStep === 4;
  const isNameEmpty = characterName.trim() === "";
  const shouldDisableNext = isLastStep && isNameEmpty;

  const handleConfirm = () => {
    console.log("Personagem confirmado:", {
      name: characterName,
      gender: selectedGender,
      skinColor: selectedSkinColor,
      hairOption: selectedHairOption,
      hairColor: selectedHairColor,
    });
    setIsCompleted(true);
    // TODO: Enviar para o backend
  };

  const handleEdit = () => {
    setIsCompleted(false);
    setStepperKey((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-2xl bg-red">
      {isCompleted ? (
        <div className="flex flex-col gap-8 p-8 rounded-4xl border border-border bg-card/50 shadow-xl">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-2xl font-bold text-foreground">Personagem Criado!</h2>
            <p className="text-sm text-muted-foreground">Confira os detalhes do seu personagem abaixo</p>
          </div>

          <div className="text-center">
            <span className="text-3xl font-bold text-primary">{characterName || "Sem nome"}</span>
          </div>

          <div className="flex flex-col gap-4 p-4 rounded-lg border border-border bg-card">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Gênero</span>
              <span className="text-sm font-medium text-foreground">
                {GENDER_OPTIONS.find((g) => g.value === selectedGender)?.label}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Cabelo</span>
              <span className="text-sm font-medium text-foreground">
                {HAIR_OPTIONS.find((h) => h.value === selectedHairOption)?.label}
              </span>
            </div>

            {needsHairColor && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Cor do Cabelo</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full border border-border"
                    style={{ backgroundColor: selectedHairColor }}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {HAIR_COLORS.find((c) => c.value === selectedHairColor)?.name}
                  </span>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Cor de Pele</span>
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full border border-border"
                  style={{ backgroundColor: selectedSkinColor }}
                />
                <span className="text-sm font-medium text-foreground">
                  {SkinColorLabel[selectedSkinColor as SkinColor]}
                </span>
              </div>
            </div>
          </div>
          <Button onClick={handleEdit} variant="outline" className="cursor-target w-full">
            Editar Personagem
          </Button>
        </div>
      ) : (
        <Stepper
          key={stepperKey}
          initialStep={1}
          onFinalStepCompleted={handleConfirm}
          onStepChange={(step) => setCurrentStep(step)}
          backButtonText="Voltar"
          nextButtonText="Continuar"
          disableNext={shouldDisableNext}
          className={"bg-background"}
        >
          <Step>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-foreground text-center">Escolha seu Gênero</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {GENDER_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedGender(option.value)}
                    className={`
                    cursor-target flex items-center gap-2 px-6 py-4 rounded-lg border text-sm font-medium
                    transition-all cursor-pointer
                    ${
                      selectedGender === option.value
                        ? "border-primary bg-primary/10 text-primary shadow-sm"
                        : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }
                  `}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </Step>
          <Step>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-foreground text-center">Escolha sua Cor de Pele</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {Object.values(SkinColor).map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedSkinColor(color)}
                    title={SkinColorLabel[color]}
                    className={`
                      cursor-target w-12 h-12 rounded-full border-2 transition-all cursor-pointer
                      hover:scale-110 hover:shadow-md
                      ${selectedSkinColor === color ? "border-primary ring-2 ring-primary/40 scale-110" : "border-border"}
                    `}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {SkinColorLabel[selectedSkinColor as SkinColor]}
              </p>
            </div>
          </Step>
          <Step>
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-semibold text-foreground text-center">Escolha seu Cabelo</h2>

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap justify-center gap-2 max-h-40 overflow-y-auto">
                  {HAIR_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedHairOption(option.value)}
                      className={`
                      cursor-target px-3 py-2 rounded-lg border text-xs font-medium
                      transition-all cursor-pointer
                      ${
                        selectedHairOption === option.value
                          ? "border-primary bg-primary/10 text-primary shadow-sm"
                          : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }
                    `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {needsHairColor && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap justify-center gap-2">
                    {HAIR_COLORS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSelectedHairColor(color.value)}
                        title={color.name}
                        className={`
                        cursor-target w-8 h-8 rounded-full border-2 transition-all cursor-pointer
                        hover:scale-110 hover:shadow-md
                        ${
                          selectedHairColor === color.value
                            ? "border-primary ring-2 ring-primary/40 scale-110"
                            : "border-border"
                        }
                      `}
                        style={{ backgroundColor: color.value }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    {HAIR_COLORS.find((c) => c.value === selectedHairColor)?.name}
                  </p>
                </div>
              )}
            </div>
          </Step>
          <Step>
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-semibold text-foreground text-center">Resumo do Personagem</h2>

              <div className="flex flex-col gap-2">
                <label htmlFor="character-name" className="text-sm font-medium text-muted-foreground">
                  Nome do Personagem
                </label>
                <input
                  id="character-name"
                  type="text"
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  placeholder="Digite o nome do seu personagem"
                  className="cursor-target w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>

              <div className="flex flex-col gap-4 p-4 rounded-lg border border-border bg-card/50">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Gênero</span>
                  <span className="text-sm font-medium text-foreground">
                    {GENDER_OPTIONS.find((g) => g.value === selectedGender)?.label}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Cabelo</span>
                  <span className="text-sm font-medium text-foreground">
                    {HAIR_OPTIONS.find((h) => h.value === selectedHairOption)?.label}
                  </span>
                </div>

                {needsHairColor && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Cor do Cabelo</span>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-full border border-border"
                        style={{ backgroundColor: selectedHairColor }}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {HAIR_COLORS.find((c) => c.value === selectedHairColor)?.name}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Cor de Pele</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full border border-border"
                      style={{ backgroundColor: selectedSkinColor }}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {SkinColorLabel[selectedSkinColor as SkinColor]}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">Confirme seu personagem</p>
            </div>
          </Step>
        </Stepper>
      )}
    </div>
  );
}
