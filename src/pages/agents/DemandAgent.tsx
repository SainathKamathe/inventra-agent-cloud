import { BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const forecastData = [
  { week: 'Week 1 (Past)', actual: 8200, predicted: 8000 },
  { week: 'Week 2 (Past)', actual: 8800, predicted: 8500 },
  { week: 'This Week', actual: 7600, predicted: 7800 },
  { week: 'Next Week', actual: null, predicted: 9200 },
  { week: 'Week 5', actual: null, predicted: 8600 },
  { week: 'Week 6', actual: null, predicted: 10100 },
];

const productForecast = [
  { name: 'Basmati Rice', current: 120, predicted: 18, action: 'Sufficient' },
  { name: 'Toor Dal', current: 8, predicted: 12, action: 'Reorder 20 units' },
  { name: 'Coca-Cola 2L', current: 45, predicted: 15, action: 'Sufficient' },
  { name: 'Maggi Noodles', current: 350, predicted: 25, action: 'Sufficient (overstock)' },
  { name: 'Surf Excel', current: 0, predicted: 8, action: 'URGENT: Reorder 15 units' },
  { name: 'LED Bulb', current: 5, predicted: 3, action: 'Reorder 10 units' },
  { name: 'Pen Refill', current: 3, predicted: 10, action: 'Reorder 25 units' },
];

export default function DemandAgent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2"><BarChart3 className="h-6 w-6 text-primary" /> Demand Prediction Agent</h1>
        <p className="text-muted-foreground text-sm">Estimates future demand using moving average analysis</p>
      </div>

      <div className="agent-card">
        <h3 className="font-display text-sm font-semibold text-foreground mb-4">Sales Forecast (₹)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
            <XAxis dataKey="week" tick={{ fill: 'hsl(215,15%,55%)', fontSize: 11 }} />
            <YAxis tick={{ fill: 'hsl(215,15%,55%)', fontSize: 12 }} />
            <Tooltip contentStyle={{ background: 'hsl(220,18%,10%)', border: '1px solid hsl(220,14%,18%)', borderRadius: 8, color: 'hsl(210,20%,92%)' }} />
            <Line type="monotone" dataKey="actual" stroke="hsl(142,71%,45%)" strokeWidth={2} dot={{ r: 4 }} name="Actual" />
            <Line type="monotone" dataKey="predicted" stroke="hsl(217,91%,60%)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} name="Predicted" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="agent-card">
        <h3 className="font-display text-sm font-semibold text-foreground mb-3">Product-Level Forecast (Next Week)</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground font-display text-xs uppercase tracking-wider">
              <th className="pb-2">Product</th><th className="pb-2">Current Stock</th><th className="pb-2">Predicted Demand</th><th className="pb-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {productForecast.map((p, i) => (
              <tr key={i} className="border-b border-border/30">
                <td className="py-2 text-foreground">{p.name}</td>
                <td className="py-2 font-display text-foreground">{p.current}</td>
                <td className="py-2 font-display text-info">{p.predicted}</td>
                <td className="py-2 text-xs"><span className={p.action.includes('URGENT') ? 'text-destructive font-semibold' : p.action.includes('Reorder') ? 'text-warning' : 'text-success'}>{p.action}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
