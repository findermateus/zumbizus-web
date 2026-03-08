"use client"

import TargetCursor from "@/components/target-cursor";
import {useEffect, useState} from "react";

export default function TargetCursorWrapper() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
    />
}