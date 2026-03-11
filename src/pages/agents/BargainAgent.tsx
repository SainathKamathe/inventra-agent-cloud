import { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockProducts } from '@/data/mockData';

interface NegotiationResult {
  product: string;
  originalPrice: number;
  requestedPrice: number;
  acceptedPrice: number;
  accepted: boolean;
  reason: string;
}

const pastNegotiations: NegotiationResult[] = [
  { product: 'Basmati Rice 5kg', originalPrice: 450, requestedPrice: 380, acceptedPrice: 420, accepted: true, reason: 'Overstock — room for discount' },
  { product: 'Colgate 100g', originalPrice: 55, requestedPrice: 40, acceptedPrice: 55, accepted: false, reason: 'Below minimum margin' },
  { product: 'Maggi Noodles', originalPrice: 14, requestedPrice: 10, acceptedPrice: 12, accepted: true, reason: 'High stock, popular product' },
];

export default function BargainAgent() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [requestedPrice, setRequestedPrice] = useState('');
  const [result, setResult] = useState<NegotiationResult | null>(null);

  const negotiate = () => {
    const product = mockProducts.find(p => p.id === selectedProduct);
    if (!product) return;
    const requested = +requestedPrice;
    const minPrice = product.costPrice * 1.05; // 5% minimum margin
    const isOverstock = product.quantity > product.reorderThreshold * 5;
    const maxDiscount = isOverstock ? 0.15 : 0.08;
    const lowestAcceptable = product.price * (1 - maxDiscount);
    const accepted = requested >= Math.max(minPrice, lowestAcceptable);
    const acceptedPrice = accepted ? requested : product.price;

    setResult({
      product: product.name, originalPrice: product.price, requestedPrice: requested, acceptedPrice,
      accepted, reason: !accepted ? `₹${requested} is below minimum (₹${Math.ceil(Math.max(minPrice, lowestAcceptable))})` : isOverstock ? 'Accepted — overstock allows discount' : 'Accepted — within margin',
    });
  };

  const successRate = Math.round(pastNegotiations.filter(n => n.accepted).length / pastNegotiations.length * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2"><MessageSquare className="h-6 w-6 text-primary" /> Customer Bargaining Agent</h1>
        <p className="text-muted-foreground text-sm">AI-powered price negotiation simulator</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="stat-card"><p className="text-xs text-muted-foreground">Success Rate</p><p className="text-2xl font-bold font-display text-primary">{successRate}%</p></div>
        <div className="stat-card"><p className="text-xs text-muted-foreground">Negotiations</p><p className="text-2xl font-bold font-display text-foreground">{pastNegotiations.length}</p></div>
        <div className="stat-card"><p className="text-xs text-muted-foreground">Avg Discount</p><p className="text-2xl font-bold font-display text-warning">7.2%</p></div>
      </div>

      <div className="agent-card">
        <h3 className="font-display text-sm font-semibold text-foreground mb-3">Negotiate Price</h3>
        <div className="flex gap-2 flex-wrap">
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="bg-secondary border-border w-64"><SelectValue placeholder="Select product" /></SelectTrigger>
            <SelectContent>{mockProducts.map(p => <SelectItem key={p.id} value={p.id}>{p.name} — ₹{p.price}</SelectItem>)}</SelectContent>
          </Select>
          <Input type="number" placeholder="Customer's offer (₹)" value={requestedPrice} onChange={e => setRequestedPrice(e.target.value)} className="bg-secondary border-border w-48" />
          <Button onClick={negotiate} disabled={!selectedProduct || !requestedPrice} className="bg-primary text-primary-foreground hover:bg-primary/90 font-display">Negotiate</Button>
        </div>
        {result && (
          <div className={`mt-4 p-4 rounded border ${result.accepted ? 'border-success/30 bg-success/10' : 'border-destructive/30 bg-destructive/10'}`}>
            <div className="flex items-center gap-2 mb-2">
              {result.accepted ? <ThumbsUp className="h-5 w-5 text-success" /> : <ThumbsDown className="h-5 w-5 text-destructive" />}
              <span className={`font-display font-bold ${result.accepted ? 'text-success' : 'text-destructive'}`}>{result.accepted ? 'DEAL ACCEPTED' : 'DEAL REJECTED'}</span>
            </div>
            <p className="text-sm text-foreground">{result.product}: ₹{result.originalPrice} → ₹{result.requestedPrice}</p>
            <p className="text-xs text-muted-foreground mt-1">{result.reason}</p>
          </div>
        )}
      </div>

      <div className="agent-card">
        <h3 className="font-display text-sm font-semibold text-foreground mb-3">Past Negotiations</h3>
        <div className="space-y-2">
          {pastNegotiations.map((n, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-secondary rounded">
              <div className="flex items-center gap-2">
                {n.accepted ? <ThumbsUp className="h-3.5 w-3.5 text-success" /> : <ThumbsDown className="h-3.5 w-3.5 text-destructive" />}
                <span className="text-sm text-foreground">{n.product}</span>
              </div>
              <div className="text-xs text-muted-foreground">₹{n.originalPrice} → ₹{n.requestedPrice} ({n.reason})</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
