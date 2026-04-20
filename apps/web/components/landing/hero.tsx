import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="w-full py-24 lg:py-32 bg-background border-b">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Livestock Classification Powered by AI Edge Vision
            </h1>
            <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              AgriNN utilizes state-of-the-art computer vision algorithms, integrating YOLO26 and
              OpenCV, to deliver automated Animal Type Classification (ATC). Extract high-precision
              morphological traits for advanced dairy and breeding operations.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/get-started">
              <Button size="lg" className="w-full sm:w-auto font-medium">
                Get Started
              </Button>
            </Link>
            <Link href="#about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto font-medium">
                Explore Architecture
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
