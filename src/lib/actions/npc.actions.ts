"use server";

import { auth } from "@/auth";
import { Gender, HairOption, SkinColor } from "@/types/npc.types";
import { NpcException } from "@/lib/exceptions/npc.exceptions";
import NpcDAO from "@/lib/data-access-objects/npc-dao";

export async function saveNpc(
  characterName: string,
  gender: Gender,
  skinColor: SkinColor,
  hairOption: HairOption,
  hairColor: string
) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!isValidHexColor(hairColor)) {
    throw new NpcException("Invalid hair color", "INVALID_HAIR_COLOR");
  }

  if (characterName.length < 3 || characterName.length > 30) {
    throw new NpcException("Character name must be between 3 and 30 characters", "INVALID_CHARACTER_NAME");
  }

  const npcDAO = new NpcDAO();
  const npc = await npcDAO.findByUserId(session.user.userId);

  if (!npc) {
    await npcDAO.createNpc(session.user.userId, characterName, gender, skinColor, hairOption, hairColor, "pending");

    return;
  }

  await npcDAO.updateNpc(session.user.userId, characterName, gender, skinColor, hairOption, hairColor, "pending");
}

function isValidHexColor(str: string) {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
}
