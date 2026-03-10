import UserDAO from "@/lib/data-access-objects/user-dao";

export async function loadUser(email: string, oauthProvider: string) {
  const userDAO = new UserDAO();
  const user = await userDAO.findByEmail(email);

  return user ?? (await userDAO.create(email, oauthProvider));
}
