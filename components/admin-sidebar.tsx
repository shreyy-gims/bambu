'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { BarChart3, ShoppingCart, Users, FileText, TrendingUp, LogOut, Vote, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';

const menuItems = [
  {
    label: 'Overview',
    href: '/admin',
    icon: BarChart3,
  },
  {
    label: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    label: 'Products',
    href: '/admin/products',
    icon: Package,
  },
  {
    label: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    label: 'Announcements',
    href: '/admin/announcements',
    icon: FileText,
  },
  {
    label: 'Polls',
    href: '/admin/polls',
    icon: Vote,
  },
  {
    label: 'Vote Results',
    href: '/admin/results',
    icon: TrendingUp,
  },
];

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/admin-auth');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-sidebar to-sidebar/95 border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sidebar-primary to-sidebar-accent flex items-center justify-center text-white text-base font-bold">
            🎋
          </div>
          <span className="text-sidebar-foreground">Admin</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/20'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <div className="px-4 py-3 bg-sidebar-accent/10 rounded-lg">
          <p className="text-xs text-sidebar-foreground/60 mb-1">Admin Portal</p>
          <p className="text-sm font-semibold text-sidebar-foreground">{user?.email || 'Administrator'}</p>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/20 rounded-lg"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
