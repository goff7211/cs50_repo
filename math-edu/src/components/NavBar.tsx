import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full border-b border-black/10 dark:border-white/10 bg-background">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Math Academy
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/courses" className="hover:underline">
            Courses
          </Link>
          <a
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noreferrer"
            className="text-foreground/70 hover:text-foreground hover:underline"
          >
            Learn Next.js
          </a>
        </div>
      </div>
    </nav>
  );
}