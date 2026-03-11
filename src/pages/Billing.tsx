import { useState, useRef } from 'react';
import { Plus, Minus, Printer, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useInventoryStore } from '@/hooks/useInventoryStore';

interface CartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export default function Billing() {
  const { products, bills, createBill } = useInventoryStore();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [lastBill, setLastBill] = useState<typeof bills[0] | null>(null);
  const billRef = useRef<HTMLDivElement>(null);

  const addToCart = () => {
    const p = products.find(pr => pr.id === selectedProduct);
    if (!p) return;
    const existing = cart.find(c => c.productId === p.id);
    if (existing) {
      setCart(cart.map(c => c.productId === p.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { productId: p.id, productName: p.name, price: p.price, quantity: 1 }]);
    }
    setSelectedProduct('');
  };

  const updateQty = (productId: string, delta: number) => {
    setCart(cart.map(c => {
      if (c.productId !== productId) return c;
      const newQty = c.quantity + delta;
      return newQty > 0 ? { ...c, quantity: newQty } : c;
    }).filter(c => c.quantity > 0));
  };

  const removeItem = (productId: string) => setCart(cart.filter(c => c.productId !== productId));

  const total = cart.reduce((s, c) => s + c.price * c.quantity, 0);

  const handleGenerate = () => {
    if (cart.length === 0) return;
    const bill = createBill(cart);
    setLastBill(bill);
    setCart([]);
  };

  const handlePrint = () => {
    if (billRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`<html><head><title>Bill</title><style>body{font-family:monospace;padding:20px}table{width:100%;border-collapse:collapse}th,td{padding:8px;text-align:left;border-bottom:1px solid #ddd}h1,h2{margin:0}</style></head><body>${billRef.current.innerHTML}</body></html>`);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Billing</h1>
        <p className="text-muted-foreground text-sm">Point of Sale</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="agent-card">
            <h3 className="font-display text-sm font-semibold text-foreground mb-3">Add Items</h3>
            <div className="flex gap-2">
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="bg-secondary border-border flex-1"><SelectValue placeholder="Select product" /></SelectTrigger>
                <SelectContent>
                  {products.filter(p => p.quantity > 0).map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.name} — ₹{p.price} (Stock: {p.quantity})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addToCart} disabled={!selectedProduct} className="bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /></Button>
            </div>
          </div>

          <div className="agent-card">
            <h3 className="font-display text-sm font-semibold text-foreground mb-3">Cart ({cart.length} items)</h3>
            {cart.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">No items added</p>
            ) : (
              <div className="space-y-2">
                {cart.map(c => (
                  <div key={c.productId} className="flex items-center justify-between p-2 bg-secondary rounded">
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.productName}</p>
                      <p className="text-xs text-muted-foreground">₹{c.price} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(c.productId, -1)} className="h-7 w-7 rounded bg-card flex items-center justify-center text-muted-foreground hover:text-foreground"><Minus className="h-3 w-3" /></button>
                      <span className="font-display text-foreground w-8 text-center">{c.quantity}</span>
                      <button onClick={() => updateQty(c.productId, 1)} className="h-7 w-7 rounded bg-card flex items-center justify-center text-muted-foreground hover:text-foreground"><Plus className="h-3 w-3" /></button>
                      <span className="font-display text-foreground w-16 text-right">₹{c.price * c.quantity}</span>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="font-display font-bold text-foreground">Total</span>
                  <span className="font-display font-bold text-primary text-xl">₹{total}</span>
                </div>
                <Button onClick={handleGenerate} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display gap-2 mt-2">
                  <Receipt className="h-4 w-4" /> Generate Bill
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {lastBill && (
            <div className="agent-card glow-green">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-sm font-semibold text-primary">Bill Generated ✓</h3>
                <Button onClick={handlePrint} variant="outline" size="sm" className="gap-1 border-border text-muted-foreground hover:text-foreground"><Printer className="h-3 w-3" /> Print</Button>
              </div>
              <div ref={billRef}>
                <div className="text-center mb-3">
                  <h2 className="font-display font-bold text-foreground">INVENTRA</h2>
                  <p className="text-xs text-muted-foreground">Patel General Store</p>
                </div>
                <div className="text-xs text-muted-foreground mb-2 flex justify-between">
                  <span>Bill #{lastBill.id}</span><span>{lastBill.date}</span>
                </div>
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-border text-muted-foreground"><th className="py-1 text-left">Item</th><th className="py-1 text-right">Qty</th><th className="py-1 text-right">Price</th><th className="py-1 text-right">Total</th></tr></thead>
                  <tbody>
                    {lastBill.items.map(i => (
                      <tr key={i.id} className="border-b border-border/30">
                        <td className="py-1 text-foreground">{i.productName}</td>
                        <td className="py-1 text-right text-foreground font-display">{i.quantity}</td>
                        <td className="py-1 text-right text-foreground font-display">₹{i.price}</td>
                        <td className="py-1 text-right text-foreground font-display">₹{i.quantity * i.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between mt-2 pt-2 border-t border-border font-display font-bold text-foreground">
                  <span>Grand Total</span><span className="text-primary">₹{lastBill.totalAmount}</span>
                </div>
              </div>
            </div>
          )}

          <div className="agent-card">
            <h3 className="font-display text-sm font-semibold text-foreground mb-3">Recent Bills</h3>
            <div className="space-y-2">
              {bills.slice(0, 5).map(b => (
                <div key={b.id} className="flex justify-between items-center p-2 bg-secondary rounded text-sm">
                  <div>
                    <span className="text-foreground font-display">#{b.id}</span>
                    <span className="text-muted-foreground ml-2">{b.date}</span>
                  </div>
                  <span className="font-display font-bold text-foreground">₹{b.totalAmount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
