export function About() {
  return (
    <section id="about" className="w-full py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-6 border p-8 bg-card">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
              The Constraint of Manual Scoring
            </h2>
            <p className="text-muted-foreground md:text-lg leading-relaxed">
              Traditional morphological evaluation remains a significant bottleneck in livestock
              management. Manual ATC grading suffers from high subjectivity, operational latency,
              and limited scalability, making consistent phenotypic data collection unfeasible
              across large-scale breeding programs.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Computer Vision Architecture
            </h2>
            <p className="text-muted-foreground md:text-lg leading-relaxed">
              AgriNN implements a specialized inference pipeline utilizing YOLO26 for robust animal
              segmentation and OpenCV for precise geometric mapping. This deterministic approach
              standardizes morphological evaluation, replacing subjective estimations with
              quantifiable, repeatable spatial analysis for accurate ATC scoring.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
