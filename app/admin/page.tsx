'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import AdminSidebar from '@/components/admin-sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, ShoppingCart, Star } from 'lucide-react';
import { LoadingPage } from '@/components/loading-page';

const revenueData = [
  { month: 'Jan', revenue: 4000, orders: 24 },
  { month: 'Feb', revenue: 3000, orders: 18 },
  { month: 'Mar', revenue: 2000, orders: 12 },
  { month: 'Apr', revenue: 2780, orders: 22 },
  { month: 'May', revenue: 1890, orders: 15 },
  { month: 'Jun', revenue: 2390, orders: 28 },
];

const productData = [
  { name: 'Toothbrush', value: 2400 },
  { name: 'Utensil Set', value: 1398 },
  { name: 'Cutting Board', value: 9800 },
  { name: 'Water Bottle', value: 3908 },
  { name: 'Organizer', value: 4800 },
];

const COLORS = ['#2d5a3d', '#3d7a4d', '#4d9a5d', '#5dba6d', '#6dda7d'];

const stats = [
  {
    label: 'Total Revenue',
    value: '$15,680',
    change: '+12.5%',
    icon: TrendingUp,
    color: 'from-primary to-primary/80',
  },
  {
    label: 'Active Users',
    value: '2,543',
    change: '+8.2%',
    icon: Users,
    color: 'from-accent to-accent/80',
  },
  {
    label: 'Total Orders',
    value: '847',
    change: '+5.3%',
    icon: ShoppingCart,
    color: 'from-secondary to-secondary/80',
  },
  {
    label: 'Avg Rating',
    value: '4.8/5',
    change: '+0.2',
    icon: Star,
    color: 'from-primary/60 to-accent/60',
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, userRole, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || userRole !== 'admin')) {
      router.push('/admin-auth');
    }
  }, [isLoading, isAuthenticated, userRole, router]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated || userRole !== 'admin') {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <AdminSidebar />

      <main className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 animate-fadeInSlideUp">
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard Overview</h1>
            <p className="text-foreground/70">Welcome to the admin portal. Here's what's happening today.</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.label}
                  className="glass rounded-2xl border-white/20 hover:border-white/40 transition-all animate-fadeInSlideUp"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-foreground/70">
                        {stat.label}
                      </CardTitle>
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground mb-2">{stat.value}</div>
                    <p className="text-xs text-primary font-semibold">{stat.change} from last month</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue chart */}
            <Card className="glass rounded-2xl border-white/20 lg:col-span-2 animate-fadeInSlideUp" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue and order counts</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '12px' }} />
                    <Tooltip
                      contentStyle={{ background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: 'white' }}
                      cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#3d7a4d" strokeWidth={2} dot={{ fill: '#3d7a4d', r: 4 }} />
                    <Line type="monotone" dataKey="orders" stroke="#5dba6d" strokeWidth={2} dot={{ fill: '#5dba6d', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Product sales pie */}
            <Card className="glass rounded-2xl border-white/20 animate-fadeInSlideUp" style={{ animationDelay: '250ms' }}>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Sales by product</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {productData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: 'white' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent orders preview */}
          <Card className="glass rounded-2xl border-white/20 animate-fadeInSlideUp" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: '#12456', customer: 'Sarah Anderson', amount: '$245.99', status: 'Completed' },
                  { id: '#12455', customer: 'John Doe', amount: '$89.50', status: 'Pending' },
                  { id: '#12454', customer: 'Emily Chen', amount: '$156.75', status: 'Completed' },
                ].map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                    <div>
                      <p className="font-semibold text-foreground">{order.id}</p>
                      <p className="text-sm text-foreground/60">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{order.amount}</p>
                      <p className={`text-xs font-medium ${order.status === 'Completed' ? 'text-primary' : 'text-accent'}`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
