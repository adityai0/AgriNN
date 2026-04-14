import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="w-full py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Initiate Your Inference Pipeline
            </h2>
            <p className="text-background/80 md:text-lg leading-relaxed">
              Deploy our open-source architecture locally or run it in the cloud. Integrate automated livestock classification into your infrastructure today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/get-started">
              <Button size="lg" className="w-full sm:w-auto font-medium bg-background text-foreground hover:bg-background/90">
                Get Started
              </Button>
            </Link>
            <Link href="https://github.com/adityai0/AgriNN" target="_blank" rel="noreferrer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto font-medium border-background/20 hover:bg-background/10 hover:text-background text-background bg-transparent">
                View on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
