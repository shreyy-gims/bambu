'use client';

import AdminSidebar from '@/components/admin-sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, MoreVertical, UserPlus, Plus, Minus, X } from 'lucide-react';
import { useState } from 'react';

const users = [
  {
    id: 1,
    name: 'Sarah Anderson',
    email: 'sarah@example.com',
    joinDate: '2023-01-15',
    status: 'active',
    level: 'gold',
    points: 2450,
    orders: 24,
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: '2023-03-22',
    status: 'active',
    level: 'silver',
    points: 1250,
    orders: 12,
  },
  {
    id: 3,
    name: 'Emily Chen',
    email: 'emily@example.com',
    joinDate: '2023-06-10',
    status: 'active',
    level: 'bronze',
    points: 650,
    orders: 8,
  },
  {
    id: 4,
    name: 'Michael Brown',
    email: 'michael@example.com',
    joinDate: '2024-01-05',
    status: 'active',
    level: 'gold',
    points: 3200,
    orders: 32,
  },
  {
    id: 5,
    name: 'Lisa Wong',
    email: 'lisa@example.com',
    joinDate: '2023-11-18',
    status: 'inactive',
    level: 'bronze',
    points: 450,
    orders: 5,
  },
  {
    id: 6,
    name: 'David Martinez',
    email: 'david@example.com',
    joinDate: '2024-02-01',
    status: 'active',
    level: 'silver',
    points: 1850,
    orders: 18,
  },
];

const getLevelColor = (level: string) => {
  const colors: { [key: string]: string } = {
    gold: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
    silver: 'bg-gray-400/20 text-gray-700 border-gray-400/30',
    bronze: 'bg-amber-600/20 text-amber-700 border-amber-600/30',
  };
  return colors[level] || 'bg-muted text-foreground';
};

const getStatusColor = (status: string) => {
  return status === 'active'
    ? 'bg-primary/20 text-primary border-primary/30'
    : 'bg-muted text-foreground/60 border-muted-foreground/20';
};

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [usersList, setUsersList] = useState(users);
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);
  const [xpAdjustment, setXpAdjustment] = useState(0);

  const filteredUsers = usersList.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || user.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddXP = (userId: number, amount: number) => {
    setUsersList(usersList.map(u =>
      u.id === userId ? { ...u, points: Math.max(0, u.points + amount) } : u
    ));
  };

  const handleUpdateUserXP = () => {
    if (selectedUser && xpAdjustment !== 0) {
      handleAddXP(selectedUser.id, xpAdjustment);
      setSelectedUser(null);
      setXpAdjustment(0);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <AdminSidebar />

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md glass rounded-2xl border-white/20 animate-fadeInSlideUp">
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedUser.name}</CardTitle>
                <CardDescription>{selectedUser.email}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedUser(null);
                  setXpAdjustment(0);
                }}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* User Details */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-foreground/60 mb-1">Status</p>
                    <Badge className={`${getStatusColor(selectedUser.status)} border capitalize`}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 mb-1">Level</p>
                    <Badge className={`${getLevelColor(selectedUser.level)} border capitalize`}>
                      {selectedUser.level}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <p className="text-xs text-foreground/60">Join Date</p>
                    <p className="text-sm font-medium text-foreground">{selectedUser.joinDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-foreground/60">Total Orders</p>
                    <p className="text-sm font-medium text-foreground">{selectedUser.orders}</p>
                  </div>
                </div>
              </div>

              {/* XP Management */}
              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">Current XP</p>
                  <p className="text-2xl font-bold text-primary">{selectedUser.points.toLocaleString()}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Adjust XP</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setXpAdjustment(xpAdjustment - 100)}
                      className="rounded-lg gap-2 flex-1"
                    >
                      <Minus className="w-4 h-4" />
                      -100
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setXpAdjustment(xpAdjustment + 100)}
                      className="rounded-lg gap-2 flex-1"
                    >
                      <Plus className="w-4 h-4" />
                      +100
                    </Button>
                  </div>
                  <input
                    type="number"
                    value={xpAdjustment}
                    onChange={(e) => setXpAdjustment(Number(e.target.value))}
                    placeholder="Custom amount"
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary/50 text-sm"
                  />
                  {xpAdjustment !== 0 && (
                    <p className="text-xs text-foreground/70">
                      New XP: <span className="font-semibold">{Math.max(0, selectedUser.points + xpAdjustment).toLocaleString()}</span>
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleUpdateUserXP}
                    disabled={xpAdjustment === 0}
                    className="flex-1 rounded-lg"
                  >
                    Update XP
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedUser(null);
                      setXpAdjustment(0);
                    }}
                    className="flex-1 rounded-lg"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <main className="flex-1 ml-64 max-sm:ml-0">
        <div className="p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="mb-8 animate-fadeInSlideUp">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Users</h1>
                <p className="text-foreground/70">Manage community members and their accounts</p>
              </div>
              <Button className="rounded-full gap-2">
                <UserPlus className="w-4 h-4" />
                Add User
              </Button>
            </div>
          </div>

          {/* Filters and search */}
          <div className="mb-8 space-y-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* Status filters */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedStatus === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus(null)}
                className="rounded-full"
              >
                All Users
              </Button>
              {['active', 'inactive'].map(status => (
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

          {/* Users table */}
          <Card className="glass rounded-2xl border-white/20 animate-fadeInSlideUp" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Level</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Points</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Orders</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Join Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground">{user.name}</td>
                        <td className="px-6 py-4 text-foreground/70">{user.email}</td>
                        <td className="px-6 py-4">
                          <Badge className={`capitalize ${getStatusColor(user.status)} border`}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={`capitalize ${getLevelColor(user.level)} border`}>
                            {user.level}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 font-semibold text-foreground">{user.points.toLocaleString()}</td>
                        <td className="px-6 py-4 text-foreground">{user.orders}</td>
                        <td className="px-6 py-4 text-sm text-foreground/70">{user.joinDate}</td>
                        <td className="px-6 py-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedUser(user)}
                            className="rounded-lg h-8 px-3 text-primary hover:text-primary hover:bg-primary/10"
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-foreground/50">No users found</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 animate-fadeInSlideUp" style={{ animationDelay: '150ms' }}>
            <Card className="glass rounded-2xl border-white/20">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-foreground/70">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{usersList.length}</div>
                <p className="text-xs text-foreground/50 mt-2">Registered members</p>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl border-white/20">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-foreground/70">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">{usersList.filter(u => u.status === 'active').length}</div>
                <p className="text-xs text-foreground/50 mt-2">Currently active</p>
              </CardContent>
            </Card>

            <Card className="glass rounded-2xl border-white/20">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-foreground/70">Avg Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">
                  {Math.round(usersList.reduce((sum, u) => sum + u.points, 0) / usersList.length).toLocaleString()}
                </div>
                <p className="text-xs text-foreground/50 mt-2">Per user</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
