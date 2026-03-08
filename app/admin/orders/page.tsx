'use client';

import AdminSidebar from '@/components/admin-sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, Eye, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const orders = [
  {
    id: '#12456',
    customer: 'Sarah Anderson',
    email: 'sarah@example.com',
    amount: '$245.99',
    items: 3,
    date: '2024-02-28',
    status: 'completed',
    payment: 'Credit Card',
    tableNumber: 5,
  },
  {
    id: '#12455',
    customer: 'John Doe',
    email: 'john@example.com',
    amount: '$89.50',
    items: 1,
    date: '2024-02-27',
    status: 'pending',
    payment: 'PayPal',
    tableNumber: 3,
  },
  {
    id: '#12454',
    customer: 'Emily Chen',
    email: 'emily@example.com',
    amount: '$156.75',
    items: 2,
    date: '2024-02-27',
    status: 'completed',
    payment: 'Apple Pay',
    tableNumber: 8,
  },
  {
    id: '#12453',
    customer: 'Michael Brown',
    email: 'michael@example.com',
    amount: '$512.30',
    items: 5,
    date: '2024-02-26',
    status: 'shipped',
    payment: 'Credit Card',
    tableNumber: 2,
  },
  {
    id: '#12452',
    customer: 'Lisa Wong',
    email: 'lisa@example.com',
    amount: '$123.45',
    items: 2,
    date: '2024-02-26',
    status: 'completed',
    payment: 'Debit Card',
    tableNumber: 12,
  },
  {
    id: '#12451',
    customer: 'David Martinez',
    email: 'david@example.com',
    amount: '$345.60',
    items: 3,
    date: '2024-02-25',
    status: 'processing',
    payment: 'Credit Card',
    tableNumber: 7,
  },
];

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    completed: 'bg-primary/20 text-primary border-primary/30',
    pending: 'bg-accent/20 text-accent border-accent/30',
    shipped: 'bg-secondary/20 text-secondary border-secondary/30',
    processing: 'bg-primary/10 text-primary/80 border-primary/20',
    accepted: 'bg-green-500/20 text-green-500 border-green-500/30',
    declined: 'bg-red-500/20 text-red-500 border-red-500/30',
  };
  return colors[status] || 'bg-muted text-foreground';
};

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [ordersList, setOrdersList] = useState(orders);

  const filteredOrders = ordersList.filter(order => {
    const matchesSearch = order.id.includes(searchTerm) || order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAcceptOrder = (orderId: string) => {
    setOrdersList(ordersList.map(order =>
      order.id === orderId ? { ...order, status: 'accepted' } : order
    ));
  };

  const handleDeclineOrder = (orderId: string) => {
    setOrdersList(ordersList.map(order =>
      order.id === orderId ? { ...order, status: 'declined' } : order
    ));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <AdminSidebar />

      <main className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 animate-fadeInSlideUp">
            <h1 className="text-4xl font-bold text-foreground mb-2">Orders</h1>
            <p className="text-foreground/70">Manage and track all customer orders</p>
          </div>

          {/* Filters and search */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                <input
                  type="text"
                  placeholder="Search by order ID or customer name..."
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

            {/* Status filters */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedStatus === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus(null)}
                className="rounded-full"
              >
                All Orders
              </Button>
              {['accepted', 'declined', 'completed', 'pending', 'shipped', 'processing'].map(status => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStatus(status)}
                  className="rounded-full capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Orders table */}
          <Card className="glass rounded-2xl border-white/20 animate-fadeInSlideUp" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Order ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Table #</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Items</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(order => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-semibold text-foreground">{order.id}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-foreground">{order.customer}</p>
                            <p className="text-sm text-foreground/60">{order.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className="bg-primary/20 text-primary border border-primary/30">
                            Table {order.tableNumber}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-foreground">{order.items}</td>
                        <td className="px-6 py-4 font-semibold text-foreground">{order.amount}</td>
                        <td className="px-6 py-4">
                          <Badge className={`capitalize ${getStatusColor(order.status)} border`}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground/70">{order.date}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 items-center">
                            {order.status === 'pending' ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleAcceptOrder(order.id)}
                                  className="rounded-lg h-8 px-3 bg-green-500/20 text-green-500 hover:bg-green-500/30 border border-green-500/30"
                                >
                                  <Check className="w-4 h-4 mr-1" />
                                  Accept
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleDeclineOrder(order.id)}
                                  variant="outline"
                                  className="rounded-lg h-8 px-3 border-red-500/30 text-red-500 hover:bg-red-500/20"
                                >
                                  <X className="w-4 h-4 mr-1" />
                                  Decline
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-lg h-8 w-8 p-0"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-foreground/50">No orders found</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 animate-fadeInSlideUp" style={{ animationDelay: '150ms' }}>
            <p className="text-sm text-foreground/60">Showing {filteredOrders.length} of {ordersList.length} orders</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-lg">Previous</Button>
              <Button variant="default" size="sm" className="rounded-lg">1</Button>
              <Button variant="outline" size="sm" className="rounded-lg">2</Button>
              <Button variant="outline" size="sm" className="rounded-lg">Next</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
