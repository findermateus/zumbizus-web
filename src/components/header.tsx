import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-5">
      <div className="container mx-auto flex h-16 items-center px-4">
        <nav className="absolute left-1/2 -translate-x-1/2 flex gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-target cursor-none"
          >
            Home
          </Link>
          <Link
            href="/character"
            className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-target cursor-none"
          >
            Personagem
          </Link>
        </nav>
      </div>
    </header>
  );
}
