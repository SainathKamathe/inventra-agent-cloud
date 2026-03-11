import { MapPin, Link2, Unlink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockShops } from '@/data/mockData';
import { useState } from 'react';
import type { Shop } from '@/data/mockData';

export default function Network() {
  const [shops, setShops] = useState<Shop[]>(mockShops);

  const toggleConnect = (id: string) => {
    setShops(shops.map(s => s.id === id ? { ...s, connected: !s.connected } : s));
  };

  const connected = shops.filter(s => s.connected);
  const available = shops.filter(s => !s.connected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Shopkeeper Network</h1>
        <p className="text-muted-foreground text-sm">Connect with nearby shops for stock exchange</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-display text-sm font-semibold text-primary mb-3 flex items-center gap-2"><Link2 className="h-4 w-4" /> Connected ({connected.length})</h3>
          <div className="space-y-3">
            {connected.map(s => (
              <div key={s.id} className="agent-card flex items-center justify-between border-primary/30">
                <div>
                  <p className="font-medium text-foreground">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.owner}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {s.area}, {s.city}</p>
                </div>
                <Button onClick={() => toggleConnect(s.id)} variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/10 gap-1">
                  <Unlink className="h-3 w-3" /> Disconnect
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold text-muted-foreground mb-3">Nearby Shops ({available.length})</h3>
          <div className="space-y-3">
            {available.map(s => (
              <div key={s.id} className="agent-card flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.owner}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {s.area}, {s.city}</p>
                </div>
                <Button onClick={() => toggleConnect(s.id)} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1">
                  <Link2 className="h-3 w-3" /> Connect
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
