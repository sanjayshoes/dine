import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types';

interface OrderHistoryContextType {
  orders: Order[];
  saveOrder: (order: Order) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getLatestOrder: () => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const OrderHistoryContext = createContext<OrderHistoryContextType | undefined>(undefined);
const ORDERS_STORAGE_KEY = 'savanna_bites_orders_v1';

export const OrderHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders history', e);
    }
  }, [orders]);

  const saveOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  };

  const getLatestOrder = () => {
    return orders[0];
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId || o.orderNumber === orderId ? { ...o, status } : o))
    );
  };

  return (
    <OrderHistoryContext.Provider
      value={{
        orders,
        saveOrder,
        getOrderById,
        getLatestOrder,
        updateOrderStatus
      }}
    >
      {children}
    </OrderHistoryContext.Provider>
  );
};

export const useOrderHistory = () => {
  const context = useContext(OrderHistoryContext);
  if (!context) {
    throw new Error('useOrderHistory must be used within an OrderHistoryProvider');
  }
  return context;
};
