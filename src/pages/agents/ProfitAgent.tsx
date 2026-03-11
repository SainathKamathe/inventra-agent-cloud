import { DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { mockProducts, mockBills } from '@/data/mockData';

const monthlyData = [
  { month: 'Oct', revenue: 42000, cost: 33000, profit: 9000 },
  { month: 'Nov', revenue: 48000, cost: 37000, profit: 11000 },
  { month: 'Dec', revenue: 55000, cost: 41000, profit: 14000 },
  { month: 'Jan', revenue: 39000, cost: 30000, profit: 9000 },
  { month: 'Feb', revenue: 46000, cost: 35000, profit: 11000 },
  { month: 'Mar', revenue: 51000, cost: 38000, profit: 13000 },
];

export default function ProfitAgent() {
  const totalRevenue = mockBills.reduce((s, b) => s + b.totalAmount, 0);
  const avgMargin = mockProducts.reduce((s, p) => s + ((p.price - p.costPrice) / p.price * 100), 0) / mockProducts.length;

  const topProfitable = mockProducts
    .map(p => ({ name: p.name, margin: ((p.price - p.costPrice) / p.price * 100), profit: p.price - p.costPrice }))
    .sort((a, b) => b.margin - a.margin)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2"><DollarSign className="h-6 w-6 text-primary" /> Profit & Loss Agent</h1>
        <p className="text-muted-foreground text-sm">Analyzes business performance and profitability</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="stat-card"><p className="text-xs text-muted-foreground">Weekly Revenue</p><p className="text-2xl font-bold font-display text-foreground">₹{totalRevenue.toLocaleString()}</p></div>
        <div className="stat-card"><p className="text-xs text-muted-foreground">Avg Profit Margin</p><p className="text-2xl font-bold font-display text-primary">{avgMargin.toFixed(1)}%</p></div>
        <div className="stat-card"><p className="text-xs text-muted-foreground">Monthly Profit</p><p className="text-2xl font-bold font-display text-success">₹13,000</p></div>
      </div>

      <div className="agent-card">
        <h3 className="font-display text-sm font-semibold text-foreground mb-4">Monthly Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
            <XAxis dataKey="month" tick={{ fill: 'hsl(215,15%,55%)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'hsl(215,15%,55%)', fontSize: 12 }} />
            <Tooltip contentStyle={{ background: 'hsl(220,18%,10%)', border: '1px solid hsl(220,14%,18%)', borderRadius: 8, color: 'hsl(210,20%,92%)' }} />
            <Bar dataKey="revenue" fill="hsl(217,91%,60%)" radius={[4, 4, 0, 0]} name="Revenue" />
            <Bar dataKey="profit" fill="hsl(142,71%,45%)" radius={[4, 4, 0, 0]} name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="agent-card">
        <h3 className="font-display text-sm font-semibold text-foreground mb-3">Top Profitable Products</h3>
        <div className="space-y-2">
          {topProfitable.map((p, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-secondary rounded">
              <span className="text-sm text-foreground">{p.name}</span>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">₹{p.profit} profit/unit</span>
                <span className="font-display text-primary text-sm">{p.margin.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
