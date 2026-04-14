import { ImagePlus, ScanLine, Ruler, ClipboardCheck, Database } from "lucide-react";

export function Workflow() {
  const steps = [
    { title: "Upload Image", icon: ImagePlus, description: "Ingest visual data via API or interface." },
    { title: "Animal Detection", icon: ScanLine, description: "YOLO26 bounding box and segmentation." },
    { title: "Morphological Analysis", icon: Ruler, description: "Extract skeletal parameters with OpenCV." },
    { title: "ATC Score Generation", icon: ClipboardCheck, description: "Calculate standardized traits." },
    { title: "Structured Records", icon: Database, description: "Export metrics to central database." }
  ];

  return (
    <section id="workflow" className="w-full py-24 bg-muted/30 border-y">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Inference Pipeline</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            A deterministic multi-stage computer vision workflow designed for minimal latency and high accuracy.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-start justify-between relative">
          <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-border -z-10" />
          
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center flex-1 w-full mb-12 md:mb-0 px-2 text-center group">
              <div className="h-24 w-24 border bg-background flex items-center justify-center mb-6 relative">
                <step.icon className="h-8 w-8 text-primary" />
                <span className="absolute -top-3 -right-3 h-6 w-6 border bg-background text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-[200px] mx-auto leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
