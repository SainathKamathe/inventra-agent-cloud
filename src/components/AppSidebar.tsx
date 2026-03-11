import {
  LayoutDashboard, Package, Receipt, Users, Bot, TrendingUp,
  Database, BarChart3, DollarSign, MessageSquare, ShieldCheck, Bell, LogOut, Menu
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from '@/components/ui/sidebar';

const mainNav = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Inventory', url: '/inventory', icon: Package },
  { title: 'Billing', url: '/billing', icon: Receipt },
  { title: 'Network', url: '/network', icon: Users },
];

const agentNav = [
  { title: 'Overstock Agent', url: '/agents/overstock', icon: Bot },
  { title: 'Market Trend', url: '/agents/market-trend', icon: TrendingUp },
  { title: 'Data Agent', url: '/agents/data', icon: Database },
  { title: 'Demand Agent', url: '/agents/demand', icon: BarChart3 },
  { title: 'Profit Agent', url: '/agents/profit', icon: DollarSign },
  { title: 'Bargain Agent', url: '/agents/bargain', icon: MessageSquare },
  { title: 'Validation Agent', url: '/agents/validation', icon: ShieldCheck },
  { title: 'Notification Agent', url: '/agents/notifications', icon: Bell },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { logout } = useAuth();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        <div className="p-4 border-b border-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display text-sm font-bold">IN</span>
              </div>
              <span className="font-display text-lg font-bold text-foreground tracking-tight">INVENTRA</span>
            </div>
          )}
          {collapsed && (
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center mx-auto">
              <span className="text-primary-foreground font-display text-sm font-bold">IN</span>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-display text-xs uppercase tracking-widest">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === '/'} className="hover:bg-secondary" activeClassName="bg-secondary text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-display text-xs uppercase tracking-widest">AI Agents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {agentNav.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className="hover:bg-secondary" activeClassName="bg-secondary text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-3 border-t border-border">
          <button onClick={logout} className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-colors w-full p-2 rounded hover:bg-secondary text-sm">
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
