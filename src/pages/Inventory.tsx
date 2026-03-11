import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product, CATEGORIES, getStockStatus, getStockColor, getStockLabel } from '@/data/mockData';
import { useInventoryStore } from '@/hooks/useInventoryStore';

export default function Inventory() {
  const { products, addProduct, updateProduct, deleteProduct } = useInventoryStore();
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: '', category: 'Grocery', price: '', costPrice: '', quantity: '', supplier: '', reorderThreshold: '', expiryDate: '' });

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => setForm({ name: '', category: 'Grocery', price: '', costPrice: '', quantity: '', supplier: '', reorderThreshold: '', expiryDate: '' });

  const handleAdd = () => {
    addProduct({
      name: form.name, category: form.category, price: +form.price, costPrice: +form.costPrice,
      quantity: +form.quantity, supplier: form.supplier, reorderThreshold: +form.reorderThreshold,
      expiryDate: form.expiryDate || undefined,
    });
    setShowAdd(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!editProduct) return;
    updateProduct(editProduct.id, {
      name: form.name, category: form.category, price: +form.price, costPrice: +form.costPrice,
      quantity: +form.quantity, supplier: form.supplier, reorderThreshold: +form.reorderThreshold,
    });
    setEditProduct(null);
    resetForm();
  };

  const openEdit = (p: Product) => {
    setForm({ name: p.name, category: p.category, price: String(p.price), costPrice: String(p.costPrice), quantity: String(p.quantity), supplier: p.supplier, reorderThreshold: String(p.reorderThreshold), expiryDate: p.expiryDate || '' });
    setEditProduct(p);
  };

  const ProductForm = ({ onSubmit, title }: { onSubmit: () => void; title: string }) => (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><Label className="text-muted-foreground text-xs">Product Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="bg-secondary border-border mt-1" /></div>
        <div>
          <Label className="text-muted-foreground text-xs">Category</Label>
          <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
            <SelectTrigger className="bg-secondary border-border mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div><Label className="text-muted-foreground text-xs">Sell Price (₹)</Label><Input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="bg-secondary border-border mt-1" /></div>
        <div><Label className="text-muted-foreground text-xs">Cost Price (₹)</Label><Input type="number" value={form.costPrice} onChange={e => setForm(f => ({ ...f, costPrice: e.target.value }))} className="bg-secondary border-border mt-1" /></div>
        <div><Label className="text-muted-foreground text-xs">Quantity</Label><Input type="number" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} className="bg-secondary border-border mt-1" /></div>
        <div><Label className="text-muted-foreground text-xs">Reorder Threshold</Label><Input type="number" value={form.reorderThreshold} onChange={e => setForm(f => ({ ...f, reorderThreshold: e.target.value }))} className="bg-secondary border-border mt-1" /></div>
        <div><Label className="text-muted-foreground text-xs">Supplier</Label><Input value={form.supplier} onChange={e => setForm(f => ({ ...f, supplier: e.target.value }))} className="bg-secondary border-border mt-1" /></div>
        <div><Label className="text-muted-foreground text-xs">Expiry Date</Label><Input type="date" value={form.expiryDate} onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))} className="bg-secondary border-border mt-1" /></div>
      </div>
      <Button onClick={onSubmit} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display">{title}</Button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Inventory</h1>
          <p className="text-muted-foreground text-sm">{products.length} products</p>
        </div>
        <Button onClick={() => { resetForm(); setShowAdd(true); }} className="bg-primary text-primary-foreground hover:bg-primary/90 font-display gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-secondary border-border" />
      </div>

      <div className="agent-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground font-display text-xs uppercase tracking-wider">
              <th className="pb-3 pr-4">Product</th>
              <th className="pb-3 pr-4">Category</th>
              <th className="pb-3 pr-4">Price</th>
              <th className="pb-3 pr-4">Qty</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3 pr-4">Supplier</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const status = getStockStatus(p);
              return (
                <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/50">
                  <td className="py-3 pr-4 font-medium text-foreground">{p.name}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{p.category}</td>
                  <td className="py-3 pr-4 text-foreground font-display">₹{p.price}</td>
                  <td className="py-3 pr-4 font-display text-foreground">{p.quantity}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-1 rounded text-xs font-display border ${getStockColor(status)}`}>
                      {getStockLabel(status)}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{p.supplier}</td>
                  <td className="py-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Edit2 className="h-3.5 w-3.5" /></button>
                      <button onClick={() => deleteProduct(p.id)} className="p-1.5 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display text-foreground">Add Product</DialogTitle></DialogHeader>
          <ProductForm onSubmit={handleAdd} title="Add Product" />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editProduct} onOpenChange={() => setEditProduct(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display text-foreground">Edit Product</DialogTitle></DialogHeader>
          <ProductForm onSubmit={handleEdit} title="Save Changes" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
