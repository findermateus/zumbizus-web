import { auth } from "@/auth";
import LoginSection from "@/components/login-section";
import CharacterCreationSection from "@/components/character-creation-section";

export default async function Page() {
  const session = await auth();

  return session ? <CharacterCreationSection /> : <LoginSection />;
}
