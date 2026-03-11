import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, Receipt, AlertTriangle, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react';
import { mockProducts, mockBills, dailySalesData, categoryDemandData, getStockStatus, mockNotifications } from '@/data/mockData';

const COLORS = ['hsl(142,71%,45%)', 'hsl(38,92%,50%)', 'hsl(217,91%,60%)', 'hsl(0,72%,51%)', 'hsl(280,60%,50%)', 'hsl(180,60%,45%)', 'hsl(320,60%,50%)'];

export default function Dashboard() {
  const totalProducts = mockProducts.length;
  const outOfStock = mockProducts.filter(p => getStockStatus(p) === 'out').length;
  const lowStock = mockProducts.filter(p => getStockStatus(p) === 'low').length;
  const totalRevenue = mockBills.reduce((s, b) => s + b.totalAmount, 0);
  const unread = mockNotifications.filter(n => !n.read).length;

  const stats = [
    { label: 'Total Products', value: totalProducts, icon: Package, color: 'text-primary' },
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-success' },
    { label: 'Out of Stock', value: outOfStock, icon: AlertTriangle, color: 'text-destructive' },
    { label: 'Low Stock', value: lowStock, icon: ShoppingCart, color: 'text-warning' },
    { label: 'Bills Today', value: mockBills.filter(b => b.date === '2026-03-10').length, icon: Receipt, color: 'text-info' },
    { label: 'Active Alerts', value: unread, icon: TrendingUp, color: 'text-destructive' },
  ];

  const stockDistribution = [
    { name: 'Healthy', value: mockProducts.filter(p => getStockStatus(p) === 'healthy').length },
    { name: 'Low', value: lowStock },
    { name: 'Out', value: outOfStock },
    { name: 'Overstock', value: mockProducts.filter(p => getStockStatus(p) === 'overstock').length },
  ];
  const PIE_COLORS = ['hsl(142,71%,45%)', 'hsl(38,92%,50%)', 'hsl(0,72%,51%)', 'hsl(217,91%,60%)'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Real-time inventory intelligence overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`h-4 w-4 ${s.color}`} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-xl font-bold font-display text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="agent-card">
          <h3 className="font-display text-sm font-semibold text-foreground mb-4">Sales Trend (7 Days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
              <XAxis dataKey="date" tick={{ fill: 'hsl(215,15%,55%)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'hsl(215,15%,55%)', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'hsl(220,18%,10%)', border: '1px solid hsl(220,14%,18%)', borderRadius: 8, color: 'hsl(210,20%,92%)' }} />
              <Bar dataKey="sales" fill="hsl(142,71%,45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="agent-card">
          <h3 className="font-display text-sm font-semibold text-foreground mb-4">Stock Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={stockDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {stockDistribution.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(220,18%,10%)', border: '1px solid hsl(220,14%,18%)', borderRadius: 8, color: 'hsl(210,20%,92%)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="agent-card">
        <h3 className="font-display text-sm font-semibold text-foreground mb-4">Category Demand</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={categoryDemandData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
            <XAxis type="number" tick={{ fill: 'hsl(215,15%,55%)', fontSize: 12 }} />
            <YAxis dataKey="category" type="category" width={100} tick={{ fill: 'hsl(215,15%,55%)', fontSize: 12 }} />
            <Tooltip contentStyle={{ background: 'hsl(220,18%,10%)', border: '1px solid hsl(220,14%,18%)', borderRadius: 8, color: 'hsl(210,20%,92%)' }} />
            <Bar dataKey="demand" fill="hsl(142,71%,45%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="agent-card">
        <h3 className="font-display text-sm font-semibold text-foreground mb-3">Recent Alerts</h3>
        <div className="space-y-2">
          {mockNotifications.slice(0, 5).map(n => (
            <div key={n.id} className={`flex items-center gap-3 p-2 rounded text-sm ${!n.read ? 'bg-secondary' : ''}`}>
              <span className={`h-2 w-2 rounded-full ${n.type === 'stockout' ? 'bg-destructive' : n.type === 'overstock' ? 'bg-info' : n.type === 'demand' ? 'bg-primary' : n.type === 'expiry' ? 'bg-warning' : 'bg-muted-foreground'}`} />
              <span className="text-foreground flex-1">{n.message}</span>
              <span className="text-xs text-muted-foreground">{new Date(n.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
