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

export interface DialogContentData {
    title: string;
    description: string;
    details: string;
    video: string;
}

interface GlassIconsSectionProps {
    items: GlassIconsItem[];
    contentMapping: Record<string, DialogContentData>;
}

export default function GlassIconsSection({items, contentMapping}: GlassIconsSectionProps) {
    const [selectedMechanic, setSelectedMechanic] = useQueryState('selectedMechanic');

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setSelectedMechanic(null);
        }
    };

    const content = selectedMechanic ? contentMapping[selectedMechanic] : null;

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