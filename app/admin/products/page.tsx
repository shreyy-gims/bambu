'use client';

import AdminSidebar from '@/components/admin-sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Bamboo Cutting Board',
    sku: 'BCB-001',
    price: '$24.99',
    stock: 45,
    category: 'Kitchenware',
    inStock: true,
  },
  {
    id: 2,
    name: 'Eco-Friendly Toothbrush',
    sku: 'EFT-001',
    price: '$8.99',
    stock: 0,
    category: 'Personal Care',
    inStock: false,
  },
  {
    id: 3,
    name: 'Bamboo Dinner Plates (Set)',
    sku: 'BDP-001',
    price: '$32.99',
    stock: 28,
    category: 'Kitchenware',
    inStock: true,
  },
  {
    id: 4,
    name: 'Reusable Bamboo Straws',
    sku: 'RBS-001',
    price: '$12.99',
    stock: 5,
    category: 'Drinkware',
    inStock: true,
  },
  {
    id: 5,
    name: 'Bamboo Storage Box',
    sku: 'BSB-001',
    price: '$34.99',
    stock: 0,
    category: 'Storage',
    inStock: false,
  },
  {
    id: 6,
    name: 'Sustainable Water Bottle',
    sku: 'SWB-001',
    price: '$28.99',
    stock: 52,
    category: 'Drinkware',
    inStock: true,
  },
  {
    id: 7,
    name: 'Bamboo Utensil Set',
    sku: 'BUS-001',
    price: '$18.99',
    stock: 3,
    category: 'Kitchenware',
    inStock: true,
  },
  {
    id: 8,
    name: 'Eco Soap Bar',
    sku: 'ESB-001',
    price: '$6.99',
    stock: 0,
    category: 'Personal Care',
    inStock: false,
  },
];

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [productsList, setProductsList] = useState(products);
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'outOfStock'>('all');

  const filteredProducts = productsList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = stockFilter === 'all' || 
      (stockFilter === 'inStock' ? product.inStock : !product.inStock);
    return matchesSearch && matchesFilter;
  });

  const handleToggleStock = (productId: number) => {
    setProductsList(productsList.map(product =>
      product.id === productId
        ? { ...product, inStock: !product.inStock, stock: !product.inStock ? product.stock || 1 : 0 }
        : product
    ));
  };

  const stockStats = {
    total: productsList.length,
    inStock: productsList.filter(p => p.inStock).length,
    outOfStock: productsList.filter(p => !p.inStock).length,
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <AdminSidebar />

      <main className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 animate-fadeInSlideUp">
            <h1 className="text-4xl font-bold text-foreground mb-2">Products</h1>
            <p className="text-foreground/70">Manage inventory and product availability</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fadeInSlideUp" style={{ animationDelay: '50ms' }}>
            <Card className="glass rounded-2xl border-white/20">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-foreground/70">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stockStats.total}</div>
                <p className="text-xs text-foreground/50 mt-2">Catalog items</p>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl border-white/20">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-foreground/70">In Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">{stockStats.inStock}</div>
                <p className="text-xs text-foreground/50 mt-2">Available items</p>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl border-white/20">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-foreground/70">Out of Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">{stockStats.outOfStock}</div>
                <p className="text-xs text-foreground/50 mt-2">Unavailable items</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and search */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                <input
                  type="text"
                  placeholder="Search by product name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary/50"
                />
              </div>
              <Button variant="outline" className="rounded-lg gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>

            {/* Stock filters */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={stockFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStockFilter('all')}
                className="rounded-full"
              >
                All Products
              </Button>
              <Button
                variant={stockFilter === 'inStock' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStockFilter('inStock')}
                className="rounded-full"
              >
                In Stock
              </Button>
              <Button
                variant={stockFilter === 'outOfStock' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStockFilter('outOfStock')}
                className="rounded-full"
              >
                Out of Stock
              </Button>
            </div>
          </div>

          {/* Products table */}
          <Card className="glass rounded-2xl border-white/20 animate-fadeInSlideUp" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Product Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">SKU</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Stock</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground">{product.name}</td>
                        <td className="px-6 py-4 text-sm text-foreground/70">{product.sku}</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-primary/20 text-primary border border-primary/30 rounded-full">
                            {product.category}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 font-semibold text-foreground">{product.price}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-foreground font-medium">{product.stock}</span>
                            {product.stock < 5 && product.stock > 0 && (
                              <AlertCircle className="w-4 h-4 text-orange-500" title="Low stock" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={`capitalize border ${product.inStock ? 'bg-green-500/20 text-green-500 border-green-500/30' : 'bg-red-500/20 text-red-500 border-red-500/30'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            size="sm"
                            onClick={() => handleToggleStock(product.id)}
                            variant={product.inStock ? 'outline' : 'default'}
                            className={`rounded-lg h-8 px-3 ${!product.inStock ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 border-red-500/30' : ''}`}
                          >
                            {product.inStock ? 'Mark Out' : 'Back In Stock'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-foreground/50">No products found</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 animate-fadeInSlideUp" style={{ animationDelay: '150ms' }}>
            <p className="text-sm text-foreground/60">Showing {filteredProducts.length} of {productsList.length} products</p>
          </div>
        </div>
      </main>
    </div>
  );
}
