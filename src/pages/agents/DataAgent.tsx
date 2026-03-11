import { Database, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const healthChecks = [
  { name: 'Product data integrity', status: 'pass', details: '12 products, all valid' },
  { name: 'Billing records consistency', status: 'pass', details: '5 bills, no orphaned items' },
  { name: 'Duplicate detection', status: 'warning', details: '0 duplicates found' },
  { name: 'Price validation', status: 'pass', details: 'All prices > cost prices' },
  { name: 'Stock quantity validation', status: 'warning', details: '1 product has 0 stock' },
  { name: 'Supplier data completeness', status: 'pass', details: 'All products have suppliers' },
];

const logs = [
  { time: '08:00', action: 'Inventory sync completed', status: 'success' },
  { time: '07:55', action: 'Duplicate check ran — 0 found', status: 'success' },
  { time: '07:50', action: 'Price validation scan', status: 'success' },
  { time: '07:45', action: 'Stockout detected: Surf Excel 1kg', status: 'warning' },
  { time: '07:30', action: 'Billing data reconciliation', status: 'success' },
  { time: '06:00', action: 'Nightly data cleanup completed', status: 'success' },
];

export default function DataAgent() {
  const passCount = healthChecks.filter(h => h.status === 'pass').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2"><Database className="h-6 w-6 text-primary" /> Data Management Agent</h1>
        <p className="text-muted-foreground text-sm">Maintains data integrity and consistency</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="stat-card"><p className="text-xs text-muted-foreground">Health Score</p><p className="text-2xl font-bold font-display text-primary">{Math.round(passCount / healthChecks.length * 100)}%</p></div>
        <div className="stat-card"><p className="text-xs text-muted-foreground">Checks Passed</p><p className="text-2xl font-bold font-display text-success">{passCount}/{healthChecks.length}</p></div>
        <div className="stat-card"><p className="text-xs text-muted-foreground">Last Scan</p><p className="text-lg font-bold font-display text-foreground">08:00 AM</p></div>
      </div>

      <div className="agent-card">
        <h3 className="font-display text-sm font-semibold text-foreground mb-3">Health Checks</h3>
        <div className="space-y-2">
          {healthChecks.map((h, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-secondary rounded">
              <div className="flex items-center gap-2">
                {h.status === 'pass' ? <CheckCircle className="h-4 w-4 text-success" /> : <AlertCircle className="h-4 w-4 text-warning" />}
                <span className="text-sm text-foreground">{h.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{h.details}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="agent-card">
        <h3 className="font-display text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><RefreshCw className="h-4 w-4" /> Activity Log</h3>
        <div className="space-y-2">
          {logs.map((l, i) => (
            <div key={i} className="flex items-center gap-3 p-2 text-sm">
              <span className="font-display text-muted-foreground text-xs w-12">{l.time}</span>
              <span className={`h-1.5 w-1.5 rounded-full ${l.status === 'success' ? 'bg-success' : 'bg-warning'}`} />
              <span className="text-foreground">{l.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
