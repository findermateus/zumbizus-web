import {signIn} from "@/auth";
import {Button} from "@/components/ui/button";
import {CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {FcGoogle} from "react-icons/fc";
import GlareCard from "@/components/glare-card";

interface Provider {
    name: string;
    providerKey: string;
    icon: React.ReactNode;
}

const providers: Provider[] = [
    {
        name: "Google",
        providerKey: "google",
        icon: <FcGoogle className="size-5"/>,
    },
];

export default function LoginSection() {
    return (
        <div className="w-full max-w-sm mx-auto">
            <GlareCard className="overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-border overflow-hidden z-10">
                    <div
                        className="absolute top-0 left-0 right-0 h-[2px] z-10 animate-shimmer bg-[length:200%_100%]"
                        style={{
                            backgroundImage: "linear-gradient(90deg, transparent, var(--primary), transparent)",
                        }}
                    />
                </div>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Acessar seu NPC</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    {providers.map((provider) => (
                        <form
                            key={provider.providerKey}
                            action={async () => {
                                "use server";
                                await signIn(provider.providerKey);
                            }}
                        >
                            <Button
                                type="submit"
                                variant="outline"
                                className="w-full cursor-target"
                                size="lg"
                            >
                                {provider.icon}
                                Entrar com {provider.name}
                            </Button>
                        </form>
                    ))}
                </CardContent>
            </GlareCard>
        </div>
    );
}