import { Target, Layers, Calculator, Zap, Server, Network } from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Edge-Ready Inference",
      description: "Optimized model weights enable high-speed processing on edge devices without requiring constant cloud connectivity.",
      icon: Zap
    },
    {
      title: "Precise Morphometrics",
      description: "OpenCV-backed geometric analysis measures spatial relationships between key skeletal anchor points.",
      icon: Target
    },
    {
      title: "YOLO26 Segmentation",
      description: "State-of-the-art detection models isolate the subject from complex barn and field backgrounds.",
      icon: Layers
    },
    {
      title: "Deterministic Scoring",
      description: "Rules-based classification engine translates raw spatial data into standardized Animal Type Classification scores.",
      icon: Calculator
    },
    {
      title: "API-First Architecture",
      description: "Integrate morphological data directly into existing herd management platforms via RESTful endpoints.",
      icon: Network
    },
    {
      title: "Immutable Data Registry",
      description: "Maintain historical records of phenotypic changes to track breeding progression over time.",
      icon: Server
    }
  ];

  return (
    <section id="features" className="w-full py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Technical Capabilities</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Enterprise-grade modules engineered for robustness in agricultural environments.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col p-8 border bg-card text-card-foreground">
              <feature.icon className="h-8 w-8 text-primary mb-6" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
