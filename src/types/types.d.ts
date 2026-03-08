import {DefaultSession} from "next-auth";

declare module "next-auth" {

    interface User {
        npc: string
    }

    interface Session {
        npc?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        idToken?: string
        npc?: string
    }
}