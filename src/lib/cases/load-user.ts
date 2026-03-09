import UserDAO from "@/lib/data-access-objects/user-dao";

export default class LoadUser {
  private userDAO: UserDAO;

  constructor(userDAO: UserDAO) {
    this.userDAO = userDAO;
  }

  async execute(email: string, oauthProvider: string) {
    const user = await this.userDAO.findByEmail(email);

    return user ?? (await this.userDAO.create(email, oauthProvider));
  }
}
