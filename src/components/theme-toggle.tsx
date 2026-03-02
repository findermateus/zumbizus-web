"use client";

import * as React from "react";
import {useEffect, useState} from "react";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";

export function ThemeToggle() {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon-sm">
                <Sun className="size-4"/>
            </Button>
        );
    }

    return (
        <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Alternar tema"
        >
            {theme === "dark" ? (
                <Sun className="size-4"/>
            ) : (
                <Moon className="size-4"/>
            )}
        </Button>
    );
}
