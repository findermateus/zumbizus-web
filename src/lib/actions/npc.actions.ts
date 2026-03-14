"use server";

import { auth } from "@/auth";
import { Gender, HairOption, SkinColor } from "@/types/npc.types";
import NpcDAO from "@/lib/data-access-objects/npc-dao";

export async function saveNpc(
  characterName: string,
  gender: Gender,
  skinColor: SkinColor,
  hairOption: HairOption,
  hairColor: string
): Promise<{ error: string } | { success: boolean }> {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!isValidHexColor(hairColor)) {
    return { error: "INVALID_HAIR_COLOR" };
  }

  if (characterName.length < 3 || characterName.length > 30) {
    return { error: "INVALID_CHARACTER_NAME" };
  }

  const npcDAO = new NpcDAO();

  const npcWithTheSameName = await npcDAO.findByName(characterName);

  if (npcWithTheSameName && npcWithTheSameName.userId !== session.user.userId) {
    return { error: "CHARACTER_NAME_TAKEN" };
  }

  const npc = await npcDAO.findByUserId(session.user.userId);

  if (!npc) {
    await npcDAO.createNpc(session.user.userId, characterName, gender, skinColor, hairOption, hairColor, "pending");
  } else {
    await npcDAO.updateNpc(session.user.userId, characterName, gender, skinColor, hairOption, hairColor, "pending");
  }

  return { success: true };
}

function isValidHexColor(str: string) {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
}
