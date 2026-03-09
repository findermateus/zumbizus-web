import { prisma } from "@/lib/prisma";

export default class UserDAO {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(email: string, oauthProvider: string) {
    return prisma.user.create({
      data: {
        email: email,
        oauthProvider: oauthProvider,
      },
    });
  }
}
