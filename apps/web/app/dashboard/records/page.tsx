import { RecentTable } from "@/components/dashboard/recent-table";

export default function RecordsPage() {
  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Analysis Records</h1>
        <p className="text-muted-foreground text-sm">
          Historical repository of all livestock evaluations and generated ATC scores.
        </p>
      </div>

      <div className="border bg-card p-4 flex gap-4">
         <input 
            type="text" 
            placeholder="Search by ID or type..." 
            className="flex-1 bg-background border px-3 py-2 text-sm"
         />
         <select className="bg-background border px-3 py-2 text-sm w-48">
           <option>All Species</option>
           <option>Cattle</option>
           <option>Buffalo</option>
         </select>
         <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium border border-primary">
           Filter
         </button>
      </div>

      <RecentTable />
    </div>
  );
}
