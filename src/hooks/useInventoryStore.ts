import { useState } from 'react';
import {
  mockProducts, mockBills, mockNotifications, mockShops,
  Product, Bill, BillItem, Notification, Shop
} from '@/data/mockData';

export function useInventoryStore() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [bills, setBills] = useState<Bill[]>(mockBills);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [shops] = useState<Shop[]>(mockShops);

  const addProduct = (p: Omit<Product, 'id' | 'shopId'>) => {
    const newP: Product = { ...p, id: `p${Date.now()}`, shopId: 'u1' };
    setProducts(prev => [...prev, newP]);
    return newP;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const createBill = (items: Omit<BillItem, 'id' | 'billId'>[]) => {
    const billId = `b${Date.now()}`;
    const total = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
    const bill: Bill = {
      id: billId,
      shopId: 'u1',
      date: new Date().toISOString().split('T')[0],
      totalAmount: total,
      items: items.map((item, idx) => ({ ...item, id: `bi${Date.now()}_${idx}`, billId })),
    };
    setBills(prev => [bill, ...prev]);
    // Reduce stock
    items.forEach(item => {
      setProducts(prev => prev.map(p =>
        p.id === item.productId ? { ...p, quantity: Math.max(0, p.quantity - item.quantity) } : p
      ));
    });
    return bill;
  };

  return { products, bills, notifications, shops, addProduct, updateProduct, deleteProduct, createBill };
}
