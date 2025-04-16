package com.allan.service;

import java.util.List;
import java.util.Set;

import com.allan.domain.OrderStatus;
import com.allan.model.Address;
import com.allan.model.Cart;
import com.allan.model.Order;
import com.allan.model.OrderItem;
import com.allan.model.User;

public interface OrderService {
    Set<Order> createOrder(User user, Address shippingAddress, Cart cart);

    Order findOrderById(long id) throws Exception;

    List<Order> userOrderHistory(Long userId);

    List<Order> sellersOrder(Long sellerId);

    Order updateOrderStatus(Long orderId, OrderStatus OrderStatus) throws Exception;

    Order cancelOrder(Long orderId, User user) throws Exception;

    OrderItem getOrderItemById(Long id) throws Exception;
}
