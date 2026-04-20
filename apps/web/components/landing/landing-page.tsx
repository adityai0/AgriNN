import { Header } from './header';
import { Hero } from './hero';
import { StatsStrip } from './stats-strip';
import { About } from './about';
import { Workflow } from './workflow';
import { Features } from './features';
import { DashboardPreview } from './dashboard-preview';
import { UseCases } from './use-case';
import { CTA } from './cta';
import { Footer } from './footer';

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20">
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsStrip />
        <About />
        <Workflow />
        <Features />
        <DashboardPreview />
        <UseCases />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
