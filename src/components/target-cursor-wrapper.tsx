"use client"

import TargetCursor from "@/components/target-cursor";

export default function TargetCursorWrapper() {
    if (window == undefined) return <></>

    return <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
    />
}