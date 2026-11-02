import { CartItem, Order, OrderItem, Product } from "../models/index.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.user.id,
      },
      include: {
        model: OrderItem,
        as: "items",
        include: {
          model: Product,
          as: "product",
        },
      },
      order: [["createdAt", "DESC"]],
    });

    return res.json(orders);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Ошибка получения заказов",
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({
      where: {
        userId: req.user.id,
      },
      include: {
        model: Product,
        as: "product",
      },
    });

    if (!cartItems.length) {
      return res.status(400).json({
        message: "Корзина пуста",
      });
    }

    const totalPrice = cartItems.reduce((total, item) => {
      return total + Number(item.product.price) * item.quantity;
    }, 0);

    const order = await Order.create({
      userId: req.user.id,
      totalPrice,
    });

    for (const item of cartItems) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
      });
    }

    await CartItem.destroy({
      where: {
        userId: req.user.id,
      },
    });

    const createdOrder = await Order.findByPk(order.id, {
      include: {
        model: OrderItem,
        as: "items",
        include: {
          model: Product,
          as: "product",
        },
      },
    });

    return res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Ошибка создания заказа",
    });
  }
};
