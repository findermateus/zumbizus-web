import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

type NpcWithRejections = Prisma.NpcGetPayload<{
  include: { npcRejections: true };
}>;

export default class NpcDAO {
  async findByUserId(userId: number): Promise<NpcWithRejections | null> {
    const npc = await prisma.npc.findUnique({
      where: {
        userId: userId,
      },
      include: {
        npcRejections: true,
      },
    });

    return npc ? npc : null;
  }
}
