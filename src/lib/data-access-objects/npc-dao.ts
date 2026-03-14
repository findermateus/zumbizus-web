import { prisma } from "@/lib/prisma";
import { Gender, HairOption, NpcWithRejections, SkinColor } from "@/types/npc.types";

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

    return !npc ? null : this.mapNpcToNpcWithRejections(npc);
  }

  async findByName(name: string): Promise<NpcWithRejections | null> {
    const npc = await prisma.npc.findFirst({
      where: {
        name: name,
      },
      include: {
        npcRejections: true,
      },
    });

    return !npc ? null : this.mapNpcToNpcWithRejections(npc);
  }

  async createNpc(
    userId: number,
    name: string,
    gender: Gender,
    skinColor: SkinColor,
    hairOption: HairOption,
    hairColor: string,
    status: string
  ) {
    const result = await prisma.npc.create({
      data: {
        userId: userId,
        name: name,
        gender: gender,
        skinColor: skinColor,
        hairOption: hairOption,
        hairColor: hairColor,
        approvalStatus: status,
        selectedCategory: "",
      },
    });

    return result.id;
  }

  async updateNpc(
    userId: number,
    name: string,
    gender: Gender,
    skinColor: SkinColor,
    hairOption: HairOption,
    hairColor: string,
    status: string
  ): Promise<void> {
    await prisma.npc.update({
      where: {
        userId: userId,
      },
      data: {
        name: name,
        gender: gender,
        skinColor: skinColor,
        hairOption: hairOption,
        hairColor: hairColor,
        approvalStatus: status,
        selectedCategory: "",
      },
    });
  }

  private mapNpcToNpcWithRejections(npc: {
    userId: number;
    name: string;
    gender: string;
    hairColor: string;
    skinColor: string;
    hairOption: string;
    npcRejections: {
      id: number;
      npcId: number;
      reason: string;
      rejectedAt: Date;
    }[];
  }): NpcWithRejections {
    return {
      userId: npc.userId,
      name: npc.name,
      gender: npc.gender as Gender,
      hairColor: npc.hairColor as string,
      skinColor: npc.skinColor,
      hairOption: npc.hairOption as HairOption,
      npcRejections: npc.npcRejections,
    };
  }
}
