'use client';

import ClientNavbar from '@/components/client-navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Tea',
    price: 10,
    image:  '/tea.jpg',
    description: 'Eco-friendly toothbrushes with soft bristles',
  },
  {
    id: 2,
    name: 'Coffee',
    price: 10,
    image: '/coffee.png',
    description: 'Portable dining set for on-the-go',
  },
  {
    id: 3,
    name: 'Maggi',
    price: 30,
    image: '/maggi.png',
    description: 'Durable kitchen essential',
  },
  {
    id: 4,
    name: 'Ramen',
    price: 100,
    image: '/ramen.png',
    description: 'Insulated eco bottle',
  },
  {
    id: 5,
    name: 'Orange Juice',
    price: 30,
    image: '/ORANGEJUICE.png',
    description: 'Keep your workspace tidy',
  },
  {
    id: 6,
    name: 'Chicken Pakora',
    price: 100.00,
    image: '/chickenpakoda.png',
    description: 'Eco-friendly charging stand',
  },
  {
    id: 7,
    name: 'Mineral Water',
    price: 100.00,
    image: '/mineralwater.png',
    description: 'Eco-friendly charging stand',
  },
  {
    id: 8,
    name: 'White Sauce Pasta',
    price: 100.00,
    image: '/whitesauce.png',
    description: 'Eco-friendly charging stand',
  },
  {
    id: 9,
    name: 'Corn Sandwich',
    price: 100.00,
    image: '/cornsandwich.png',
    description: 'Eco-friendly charging stand',
  },
  {
    id: 10,
    name: 'Poha',
    price: 100.00,
    image: '/poha.png',
    description: 'Eco-friendly charging stand',
  },
  {
    id: 11,
    name: 'Chicken Fried Rice',
    price: 100.00,
    image: '/chickenpakoda.png',
    description: 'Eco-friendly charging stand',
  },
  {
    id: 12,
    name: 'Chicken Chilly',
    price: 100.00,
    image: '/chickenfriedrice.png',
    description: 'Eco-friendly charging stand',
  },
  {
    id: 13,
    name: 'French Fries',
    price: 100.00,
    image: '/frenchfries.png',
    description: 'Eco-friendly charging stand',
  },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function OrderPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: typeof products[0]) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <ClientNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 animate-fadeInSlideUp">
          <h1 className="text-4xl font-bold text-foreground mb-2">Order Products</h1>
          <p className="text-foreground/70">Browse our sustainable bamboo collection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map((product, index) => (
                <Card
                  key={product.id}
                  className="glass rounded-2xl border-white/20 hover:border-white/40 overflow-hidden group animate-fadeInSlideUp"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="w-full aspect-[4/3] overflow-hidden rounded-xl mb-3">
                    <img
                     src={product.image}
                     alt={product.name}
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                   </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">₹{product.price.toFixed(2)}</span>
                      <Button
                        onClick={() => addToCart(product)}
                        className="rounded-full h-10 w-10 p-0"
                        size="sm"
                      >
                        <Plus className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart sidebar */}
          <div className="animate-fadeInSlideUp" style={{ animationDelay: '300ms' }}>
            <Card className="glass rounded-2xl border-white/20 sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Shopping Cart
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-sm text-foreground/50 text-center py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.id} className="border-b border-white/10 pb-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold text-sm">{item.image} {item.name}</p>
                              <p className="text-xs text-foreground/60">₹{item.price.toFixed(2)} each</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-foreground/40 hover:text-destructive transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-semibold flex-1 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 pt-4 border-t border-white/10">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping:</span>
                        <span>₹{shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-base pt-2 border-t border-white/10">
                        <span>Total:</span>
                        <span className="text-primary">₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                )}

                <Button className="w-full mt-6 rounded-full h-10" disabled={cart.length === 0}>
                  Checkout ({cart.length})
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
