import Link from 'next/link';
import { LayoutDashboard, ScanLine, History, PieChart, Settings } from 'lucide-react';

export function Sidebar() {
  const links = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Analyze', href: '/dashboard/analyze', icon: ScanLine },
    { name: 'Records', href: '/dashboard/records', icon: History },
    { name: 'Analytics', href: '/dashboard/analytics', icon: PieChart },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r bg-background flex flex-col hidden md:flex h-full">
      <div className="h-16 flex items-center px-6 border-b">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">AgriNN</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <link.icon className="h-4 w-4" />
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <div className="px-3 py-2 text-xs text-muted-foreground font-mono">
          SYSTEM_STATUS: ONLINE
        </div>
      </div>
    </aside>
  );
}
