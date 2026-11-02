import { CartItem, Product } from "../models/index.js";

export const getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({
      where: {
        userId: req.user.id,
      },
      include: {
        model: Product,
        as: "product",
      },
      order: [["id", "ASC"]],
    });

    return res.json(cartItems);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Ошибка получения корзины",
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body || {};

    if (!productId) {
      return res.status(400).json({
        message: "Не указан товар",
      });
    }

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        message: "Товар не найден",
      });
    }

    const existingItem = await CartItem.findOne({
      where: {
        userId: req.user.id,
        productId,
      },
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();

      return res.json(existingItem);
    }

    const cartItem = await CartItem.create({
      userId: req.user.id,
      productId,
      quantity,
    });

    return res.status(201).json(cartItem);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Ошибка добавления товара в корзину",
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        message: "Не указаны данные",
      });
    }

    const cartItem = await CartItem.findOne({
      where: {
        userId: req.user.id,
        productId,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Товар отсутствует в корзине",
      });
    }

    if (quantity <= 0) {
      await cartItem.destroy();

      return res.json({
        message: "Товар удалён из корзины",
      });
    }

    cartItem.quantity = quantity;

    await cartItem.save();

    return res.json(cartItem);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Ошибка изменения корзины",
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        message: "Не указан товар",
      });
    }

    const cartItem = await CartItem.findOne({
      where: {
        userId: req.user.id,
        productId,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Товар отсутствует в корзине",
      });
    }

    await cartItem.destroy();

    return res.json({
      message: "Товар удалён из корзины",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Ошибка удаления товара из корзины",
    });
  }
};
