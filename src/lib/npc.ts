import {Session} from "next-auth";
import NpcDAO from "@/lib/data-access-objects/npc-dao";

export async function loadNpc(session: Session) {
    const npcDAO = new NpcDAO();

    return await npcDAO.findByUserId(session.user.userId);
}