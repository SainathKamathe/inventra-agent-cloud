import { Bell, AlertTriangle, Package, TrendingUp, Clock } from 'lucide-react';
import { mockNotifications } from '@/data/mockData';
import { useState } from 'react';

export default function NotificationAgent() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unread = notifications.filter(n => !n.read).length;

  const markRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'stockout': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'overstock': return <Package className="h-4 w-4 text-info" />;
      case 'demand': return <TrendingUp className="h-4 w-4 text-primary" />;
      case 'expiry': return <Clock className="h-4 w-4 text-warning" />;
      default: return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2"><Bell className="h-6 w-6 text-primary" /> Notification Agent</h1>
          <p className="text-muted-foreground text-sm">Intelligent alert system for critical events</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-xs text-primary hover:underline font-display">Mark all read</button>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="stat-card"><p className="text-xs text-muted-foreground">Total</p><p className="text-2xl font-bold font-display text-foreground">{notifications.length}</p></div>
        <div className="stat-card"><p className="text-xs text-muted-foreground">Unread</p><p className="text-2xl font-bold font-display text-destructive">{unread}</p></div>
        <div className="stat-card"><p className="text-xs text-muted-foreground">Critical</p><p className="text-2xl font-bold font-display text-destructive">{notifications.filter(n => n.type === 'stockout').length}</p></div>
        <div className="stat-card"><p className="text-xs text-muted-foreground">Warnings</p><p className="text-2xl font-bold font-display text-warning">{notifications.filter(n => n.type === 'overstock' || n.type === 'expiry').length}</p></div>
      </div>

      <div className="agent-card">
        <h3 className="font-display text-sm font-semibold text-foreground mb-3">Notification Feed</h3>
        <div className="space-y-2">
          {notifications.map(n => (
            <div key={n.id} onClick={() => markRead(n.id)} className={`flex items-start gap-3 p-3 rounded cursor-pointer transition-colors ${!n.read ? 'bg-secondary border border-primary/20' : 'bg-secondary/50 hover:bg-secondary'}`}>
              {getIcon(n.type)}
              <div className="flex-1">
                <p className={`text-sm ${!n.read ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(n.timestamp).toLocaleString()}</p>
              </div>
              {!n.read && <span className="h-2 w-2 rounded-full bg-primary mt-2 animate-pulse-glow" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
