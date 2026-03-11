import { ShieldCheck, CheckCircle, XCircle } from 'lucide-react';

const decisions = [
  { id: 1, agent: 'Demand Agent', action: 'Reorder Toor Dal — 20 units', status: 'approved', reason: 'Low stock (8), high demand, good margin (16.7%)' },
  { id: 2, agent: 'Demand Agent', action: 'Reorder Pen Refill — 25 units', status: 'approved', reason: 'Critically low stock (3), moderate demand' },
  { id: 3, agent: 'Overstock Agent', action: 'Transfer Parle-G to Kumar Kirana — 200 units', status: 'approved', reason: 'Overstock at 500 units, connected shop has demand' },
  { id: 4, agent: 'Demand Agent', action: 'Reorder Notebook A4 — 50 units', status: 'rejected', reason: 'Already overstocked (200 units), storage constraint' },
  { id: 5, agent: 'Bargain Agent', action: 'Accept ₹380 for Basmati Rice', status: 'rejected', reason: 'Below cost price (₹380), margin would be 0%' },
  { id: 6, agent: 'Overstock Agent', action: 'Markdown Maggi by 10%', status: 'approved', reason: 'Extreme overstock (350 units), markdown will accelerate sales' },
  { id: 7, agent: 'Demand Agent', action: 'Reorder Surf Excel — 15 units', status: 'approved', reason: 'Out of stock, high demand category, good margin' },
];

export default function ValidationAgent() {
  const approved = decisions.filter(d => d.status === 'approved');
  const rejected = decisions.filter(d => d.status === 'rejected');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2"><ShieldCheck className="h-6 w-6 text-primary" /> Decision Validation Agent</h1>
        <p className="text-muted-foreground text-sm">Validates decisions from other agents against business rules</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="stat-card"><p className="text-xs text-muted-foreground">Total Decisions</p><p className="text-2xl font-bold font-display text-foreground">{decisions.length}</p></div>
        <div className="stat-card"><p className="text-xs text-muted-foreground">Approved</p><p className="text-2xl font-bold font-display text-success">{approved.length}</p></div>
        <div className="stat-card"><p className="text-xs text-muted-foreground">Rejected</p><p className="text-2xl font-bold font-display text-destructive">{rejected.length}</p></div>
      </div>

      <div className="agent-card">
        <h3 className="font-display text-sm font-semibold text-success mb-3 flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Approved Decisions</h3>
        <div className="space-y-2">
          {approved.map(d => (
            <div key={d.id} className="p-3 bg-secondary rounded border-l-2 border-success">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{d.action}</span>
                <span className="text-xs text-muted-foreground font-display">{d.agent}</span>
              </div>
              <p className="text-xs text-muted-foreground">{d.reason}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="agent-card">
        <h3 className="font-display text-sm font-semibold text-destructive mb-3 flex items-center gap-2"><XCircle className="h-4 w-4" /> Rejected Decisions</h3>
        <div className="space-y-2">
          {rejected.map(d => (
            <div key={d.id} className="p-3 bg-secondary rounded border-l-2 border-destructive">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{d.action}</span>
                <span className="text-xs text-muted-foreground font-display">{d.agent}</span>
              </div>
              <p className="text-xs text-muted-foreground">{d.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
