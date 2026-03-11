import { AlertTriangle, ArrowRightLeft, Package } from 'lucide-react';
import { mockProducts, getStockStatus, getStockColor, getStockLabel } from '@/data/mockData';

export default function OverstockAgent() {
  const overstocked = mockProducts.filter(p => getStockStatus(p) === 'overstock');
  const outOfStock = mockProducts.filter(p => getStockStatus(p) === 'out');
  const lowStock = mockProducts.filter(p => getStockStatus(p) === 'low');

  const suggestions = [
    ...overstocked.map(p => ({ product: p.name, action: `Transfer excess stock (${p.quantity - p.reorderThreshold * 3} units) to nearby shop`, type: 'overstock' as const })),
    ...outOfStock.map(p => ({ product: p.name, action: 'Request from connected shopkeeper or reorder immediately', type: 'stockout' as const })),
    ...lowStock.map(p => ({ product: p.name, action: `Reorder soon — ${p.quantity} units left (threshold: ${p.reorderThreshold})`, type: 'low' as const })),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2"><Package className="h-6 w-6 text-primary" /> Overstock & Stockout Agent</h1>
        <p className="text-muted-foreground text-sm">Monitors inventory levels and detects anomalies</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="stat-card"><p className="text-xs text-muted-foreground">Overstock</p><p className="text-2xl font-bold font-display text-info">{overstocked.length}</p></div>
        <div className="stat-card"><p className="text-xs text-muted-foreground">Out of Stock</p><p className="text-2xl font-bold font-display text-destructive">{outOfStock.length}</p></div>
        <div className="stat-card"><p className="text-xs text-muted-foreground">Low Stock</p><p className="text-2xl font-bold font-display text-warning">{lowStock.length}</p></div>
      </div>

      {[
        { title: 'Overstock Products', items: overstocked, status: 'overstock' },
        { title: 'Out of Stock', items: outOfStock, status: 'out' },
        { title: 'Low Stock', items: lowStock, status: 'low' },
      ].map(section => section.items.length > 0 && (
        <div key={section.title} className="agent-card">
          <h3 className="font-display text-sm font-semibold text-foreground mb-3">{section.title}</h3>
          <div className="space-y-2">
            {section.items.map(p => (
              <div key={p.id} className="flex items-center justify-between p-2 bg-secondary rounded">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-display border ${getStockColor(section.status)}`}>{getStockLabel(section.status)}</span>
                  <span className="text-foreground text-sm">{p.name}</span>
                </div>
                <span className="font-display text-foreground">{p.quantity} units</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="agent-card">
        <h3 className="font-display text-sm font-semibold text-primary mb-3 flex items-center gap-2"><ArrowRightLeft className="h-4 w-4" /> Suggested Actions</h3>
        <div className="space-y-2">
          {suggestions.map((s, i) => (
            <div key={i} className="flex items-start gap-3 p-2 bg-secondary rounded">
              <AlertTriangle className={`h-4 w-4 mt-0.5 ${s.type === 'overstock' ? 'text-info' : s.type === 'stockout' ? 'text-destructive' : 'text-warning'}`} />
              <div>
                <p className="text-sm font-medium text-foreground">{s.product}</p>
                <p className="text-xs text-muted-foreground">{s.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
