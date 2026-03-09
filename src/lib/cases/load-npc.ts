import NpcDAO from "@/lib/data-access-objects/npc-dao";

export default class LoadNpc {
  private npcDAO: NpcDAO;

  constructor(npcDAO: NpcDAO) {
    this.npcDAO = npcDAO;
  }

  async execute(userId: number) {
    return await this.npcDAO.findByUserId(userId);
  }
}
