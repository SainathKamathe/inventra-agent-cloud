export interface User {
  id: string;
  name: string;
  shopName: string;
  mobile: string;
  email: string;
  city: string;
  area: string;
}

export interface Product {
  id: string;
  shopId: string;
  name: string;
  category: string;
  price: number;
  costPrice: number;
  quantity: number;
  expiryDate?: string;
  reorderThreshold: number;
  supplier: string;
}

export interface Bill {
  id: string;
  shopId: string;
  date: string;
  totalAmount: number;
  items: BillItem[];
}

export interface BillItem {
  id: string;
  billId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Shop {
  id: string;
  name: string;
  owner: string;
  city: string;
  area: string;
  connected: boolean;
}

export interface Notification {
  id: string;
  type: 'overstock' | 'stockout' | 'demand' | 'expiry' | 'info';
  message: string;
  timestamp: string;
  read: boolean;
}

export const CATEGORIES = ['Electronics', 'Grocery', 'Clothing', 'Stationery', 'Household', 'Beverages', 'Snacks', 'Personal Care'];

export const mockUser: User = {
  id: 'u1',
  name: 'sainath kamathe',
  shopName: 'Kamathe General Store',
  mobile: '9876543210',
  email: 'sainath kamathe',
  city: 'Mumbai',
  area: 'Andheri West',
};

export const mockProducts: Product[] = [
  { id: 'p1', shopId: 'u1', name: 'Basmati Rice 5kg', category: 'Grocery', price: 450, costPrice: 380, quantity: 120, reorderThreshold: 20, supplier: 'Agro Foods' },
  { id: 'p2', shopId: 'u1', name: 'Toor Dal 1kg', category: 'Grocery', price: 180, costPrice: 150, quantity: 8, reorderThreshold: 15, supplier: 'Agro Foods' },
  { id: 'p3', shopId: 'u1', name: 'Coca-Cola 2L', category: 'Beverages', price: 95, costPrice: 75, quantity: 45, reorderThreshold: 20, supplier: 'Metro Beverages' },
  { id: 'p4', shopId: 'u1', name: 'Notebook A4', category: 'Stationery', price: 60, costPrice: 40, quantity: 200, reorderThreshold: 30, supplier: 'Office Plus' },
  { id: 'p5', shopId: 'u1', name: 'Surf Excel 1kg', category: 'Household', price: 220, costPrice: 185, quantity: 0, reorderThreshold: 10, supplier: 'HUL Dist.' },
  { id: 'p6', shopId: 'u1', name: 'Maggi Noodles', category: 'Snacks', price: 14, costPrice: 11, quantity: 350, reorderThreshold: 50, supplier: 'Nestle Dist.' },
  { id: 'p7', shopId: 'u1', name: 'Colgate 100g', category: 'Personal Care', price: 55, costPrice: 42, quantity: 35, reorderThreshold: 15, supplier: 'CP Dist.' },
  { id: 'p8', shopId: 'u1', name: 'LED Bulb 9W', category: 'Electronics', price: 120, costPrice: 85, quantity: 5, reorderThreshold: 10, supplier: 'Philips Retail' },
  { id: 'p9', shopId: 'u1', name: 'Amul Butter 500g', category: 'Grocery', price: 270, costPrice: 240, quantity: 18, reorderThreshold: 10, supplier: 'Amul Dairy' },
  { id: 'p10', shopId: 'u1', name: 'Parle-G Biscuit', category: 'Snacks', price: 10, costPrice: 8, quantity: 500, reorderThreshold: 100, supplier: 'Parle Dist.' },
  { id: 'p11', shopId: 'u1', name: 'Pen Refill Blue', category: 'Stationery', price: 5, costPrice: 3, quantity: 3, reorderThreshold: 20, supplier: 'Office Plus' },
  { id: 'p12', shopId: 'u1', name: 'Sugar 1kg', category: 'Grocery', price: 48, costPrice: 40, quantity: 60, reorderThreshold: 20, supplier: 'Agro Foods' },
];

export const mockBills: Bill[] = [
  {
    id: 'b1', shopId: 'u1', date: '2026-03-10', totalAmount: 743,
    items: [
      { id: 'bi1', billId: 'b1', productId: 'p1', productName: 'Basmati Rice 5kg', quantity: 1, price: 450 },
      { id: 'bi2', billId: 'b1', productId: 'p3', productName: 'Coca-Cola 2L', quantity: 2, price: 95 },
      { id: 'bi3', billId: 'b1', productId: 'p7', productName: 'Colgate 100g', quantity: 1, price: 55 },
      { id: 'bi4', billId: 'b1', productId: 'p6', productName: 'Maggi Noodles', quantity: 3, price: 14 },
    ]
  },
  {
    id: 'b2', shopId: 'u1', date: '2026-03-10', totalAmount: 590,
    items: [
      { id: 'bi5', billId: 'b2', productId: 'p2', productName: 'Toor Dal 1kg', quantity: 2, price: 180 },
      { id: 'bi6', billId: 'b2', productId: 'p9', productName: 'Amul Butter 500g', quantity: 1, price: 270 },
    ]
  },
  {
    id: 'b3', shopId: 'u1', date: '2026-03-09', totalAmount: 1280,
    items: [
      { id: 'bi7', billId: 'b3', productId: 'p1', productName: 'Basmati Rice 5kg', quantity: 2, price: 450 },
      { id: 'bi8', billId: 'b3', productId: 'p12', productName: 'Sugar 1kg', quantity: 3, price: 48 },
      { id: 'bi9', billId: 'b3', productId: 'p4', productName: 'Notebook A4', quantity: 3, price: 60 },
    ]
  },
  {
    id: 'b4', shopId: 'u1', date: '2026-03-08', totalAmount: 425,
    items: [
      { id: 'bi10', billId: 'b4', productId: 'p6', productName: 'Maggi Noodles', quantity: 10, price: 14 },
      { id: 'bi11', billId: 'b4', productId: 'p10', productName: 'Parle-G Biscuit', quantity: 5, price: 10 },
      { id: 'bi12', billId: 'b4', productId: 'p9', productName: 'Amul Butter 500g', quantity: 1, price: 270 },
    ]
  },
  {
    id: 'b5', shopId: 'u1', date: '2026-03-07', totalAmount: 890,
    items: [
      { id: 'bi13', billId: 'b5', productId: 'p1', productName: 'Basmati Rice 5kg', quantity: 1, price: 450 },
      { id: 'bi14', billId: 'b5', productId: 'p3', productName: 'Coca-Cola 2L', quantity: 3, price: 95 },
      { id: 'bi15', billId: 'b5', productId: 'p7', productName: 'Colgate 100g', quantity: 2, price: 55 },
    ]
  },
];

export const mockShops: Shop[] = [
  { id: 's1', name: 'Kumar Kirana', owner: 'Suresh Kumar', city: 'Mumbai', area: 'Andheri West', connected: true },
  { id: 's2', name: 'Sharma Mart', owner: 'Vikram Sharma', city: 'Mumbai', area: 'Andheri East', connected: true },
  { id: 's3', name: 'Gupta Store', owner: 'Ramesh Gupta', city: 'Mumbai', area: 'Juhu', connected: false },
  { id: 's4', name: 'Singh General', owner: 'Harpreet Singh', city: 'Mumbai', area: 'Bandra', connected: false },
  { id: 's5', name: 'Desai Provisions', owner: 'Mehul Desai', city: 'Mumbai', area: 'Andheri West', connected: true },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', type: 'stockout', message: 'Surf Excel 1kg is OUT OF STOCK', timestamp: '2026-03-11T08:00:00', read: false },
  { id: 'n2', type: 'stockout', message: 'Pen Refill Blue critically low (3 units)', timestamp: '2026-03-11T07:45:00', read: false },
  { id: 'n3', type: 'overstock', message: 'Parle-G Biscuit overstock detected (500 units, threshold 100)', timestamp: '2026-03-11T07:30:00', read: false },
  { id: 'n4', type: 'overstock', message: 'Notebook A4 overstock detected (200 units)', timestamp: '2026-03-11T07:00:00', read: true },
  { id: 'n5', type: 'demand', message: 'High demand predicted for Basmati Rice next week', timestamp: '2026-03-10T18:00:00', read: true },
  { id: 'n6', type: 'expiry', message: 'Amul Butter batch approaching expiry (15 days)', timestamp: '2026-03-10T12:00:00', read: true },
  { id: 'n7', type: 'info', message: 'Market trend: Beverage sales up 23% this week', timestamp: '2026-03-10T09:00:00', read: true },
];

// Sales data for charts
export const dailySalesData = [
  { date: 'Mar 5', sales: 2100, profit: 420 },
  { date: 'Mar 6', sales: 1800, profit: 360 },
  { date: 'Mar 7', sales: 890, profit: 178 },
  { date: 'Mar 8', sales: 425, profit: 85 },
  { date: 'Mar 9', sales: 1280, profit: 256 },
  { date: 'Mar 10', sales: 1333, profit: 267 },
  { date: 'Mar 11', sales: 950, profit: 190 },
];

export const categoryDemandData = [
  { category: 'Grocery', demand: 85, sales: 4200 },
  { category: 'Snacks', demand: 72, sales: 1800 },
  { category: 'Beverages', demand: 65, sales: 1400 },
  { category: 'Personal Care', demand: 45, sales: 900 },
  { category: 'Stationery', demand: 38, sales: 600 },
  { category: 'Household', demand: 55, sales: 1100 },
  { category: 'Electronics', demand: 25, sales: 480 },
];

export const demandForecast = [
  { week: 'This Week', actual: 8800, predicted: null },
  { week: 'Next Week', actual: null, predicted: 9200 },
  { week: 'Week 3', actual: null, predicted: 8600 },
  { week: 'Week 4', actual: null, predicted: 10100 },
];

export function getStockStatus(product: Product): 'healthy' | 'low' | 'out' | 'overstock' {
  if (product.quantity === 0) return 'out';
  if (product.quantity < product.reorderThreshold) return 'low';
  if (product.quantity > product.reorderThreshold * 5) return 'overstock';
  return 'healthy';
}

export function getStockColor(status: string) {
  switch (status) {
    case 'healthy': return 'stock-green';
    case 'low': return 'stock-yellow';
    case 'out': return 'stock-red';
    case 'overstock': return 'stock-blue';
    default: return '';
  }
}

export function getStockLabel(status: string) {
  switch (status) {
    case 'healthy': return 'Healthy';
    case 'low': return 'Low Stock';
    case 'out': return 'Out of Stock';
    case 'overstock': return 'Overstock';
    default: return '';
  }
}
