interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ElementType;
}

export function StatCard({ title, value, description, icon: Icon }: StatCardProps) {
  return (
    <div className="p-6 border bg-card text-card-foreground">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        {description && (
          <span className="text-xs text-muted-foreground font-mono">{description}</span>
        )}
      </div>
    </div>
  );
}
