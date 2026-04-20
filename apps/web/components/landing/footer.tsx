import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xl font-bold tracking-tight">AgriNN</span>
          <p className="text-sm text-muted-foreground">
            AI-powered livestock classification for modern agriculture.
          </p>
        </div>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="#about" className="hover:underline underline-offset-4">
            About
          </Link>
          <Link href="#features" className="hover:underline underline-offset-4">
            Features
          </Link>
          <Link
            href="https://github.com/adityai0/AgriNN"
            target="_blank"
            rel="noreferrer"
            className="hover:underline underline-offset-4"
          >
            GitHub
          </Link>
          <Link href="/get-started" className="hover:underline underline-offset-4">
            Get Started
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-8 pt-8 border-t flex flex-col items-center text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} AgriNN. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
