import { TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { categoryDemandData } from '@/data/mockData';

const trendingProducts = [
  { name: 'Basmati Rice 5kg', trend: 'up', change: '+15%', sales: 12 },
  { name: 'Coca-Cola 2L', trend: 'up', change: '+23%', sales: 8 },
  { name: 'Maggi Noodles', trend: 'up', change: '+10%', sales: 18 },
  { name: 'Amul Butter 500g', trend: 'up', change: '+8%', sales: 5 },
];

const slowProducts = [
  { name: 'LED Bulb 9W', trend: 'down', change: '-40%', sales: 1 },
  { name: 'Pen Refill Blue', trend: 'down', change: '-25%', sales: 2 },
  { name: 'Notebook A4', trend: 'down', change: '-12%', sales: 3 },
];

export default function MarketTrendAgent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2"><TrendingUp className="h-6 w-6 text-primary" /> Market Trend Agent</h1>
        <p className="text-muted-foreground text-sm">Analyzes sales trends and category demand</p>
      </div>

      <div className="agent-card">
        <h3 className="font-display text-sm font-semibold text-foreground mb-4">Category Demand Index</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryDemandData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
            <XAxis dataKey="category" tick={{ fill: 'hsl(215,15%,55%)', fontSize: 11 }} />
            <YAxis tick={{ fill: 'hsl(215,15%,55%)', fontSize: 12 }} />
            <Tooltip contentStyle={{ background: 'hsl(220,18%,10%)', border: '1px solid hsl(220,14%,18%)', borderRadius: 8, color: 'hsl(210,20%,92%)' }} />
            <Bar dataKey="demand" fill="hsl(142,71%,45%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="sales" fill="hsl(217,91%,60%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="agent-card">
          <h3 className="font-display text-sm font-semibold text-primary mb-3 flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Trending Products</h3>
          <div className="space-y-2">
            {trendingProducts.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-secondary rounded">
                <span className="text-sm text-foreground">{p.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{p.sales} sold/week</span>
                  <span className="text-xs text-success font-display">{p.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="agent-card">
          <h3 className="font-display text-sm font-semibold text-destructive mb-3 flex items-center gap-2"><TrendingDown className="h-4 w-4" /> Slow Moving</h3>
          <div className="space-y-2">
            {slowProducts.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-secondary rounded">
                <span className="text-sm text-foreground">{p.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{p.sales} sold/week</span>
                  <span className="text-xs text-destructive font-display">{p.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
