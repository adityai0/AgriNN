import { Button } from '@/components/ui/button';
import { Bell, Search } from 'lucide-react';

export function Topbar() {
  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-2 text-muted-foreground w-1/3">
        <Search className="h-4 w-4" />
        <input
          type="text"
          placeholder="Search records or IDs..."
          className="bg-transparent border-none outline-none text-sm w-full font-medium"
        />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <Bell className="h-4 w-4" />
        </Button>
        <div className="h-8 w-8 bg-muted flex items-center justify-center text-xs font-bold border">
          AD
        </div>
      </div>
    </header>
  );
}
