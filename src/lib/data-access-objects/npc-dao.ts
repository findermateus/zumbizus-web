import { prisma } from "@/lib/prisma";

export default class NpcDAO {
  async findByUserId(userId: number) {
    return prisma.npc.findUnique({
      where: {
        userId: userId,
      },
      include: {
        npcRejections: true,
      },
    });
  }
}
