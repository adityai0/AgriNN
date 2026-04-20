export function UseCases() {
  const useCases = [
    {
      title: 'Precision Dairy Farming',
      description:
        'Correlate morphological traits with lactation yields to optimize nutritional and environmental interventions.',
    },
    {
      title: 'Genomic Breeding Programs',
      description:
        'Provide definitive, unbiased phenotypic data sets to enhance accuracy in sire selection and herd genetics.',
    },
    {
      title: 'Institutional Research',
      description:
        'Facilitate large-scale automated data collection for epidemiological studies and agricultural research.',
    },
  ];

  return (
    <section id="use-cases" className="w-full py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Deployment Scenarios
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-[500px] leading-relaxed">
              AgriNN is engineered for high-stakes agricultural environments where objective data is
              critical for operational scalability.
            </p>
          </div>
          <div className="flex-[2] grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {useCases.map((useCase, index) => (
              <div key={index} className="p-8 border bg-card">
                <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
