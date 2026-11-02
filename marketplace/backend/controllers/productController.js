import { Product } from "../models/index.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [["id", "ASC"]],
    });

    return res.json(products);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Ошибка получения товаров",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Товар не найден",
      });
    }

    return res.json(product);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Ошибка получения товара",
    });
  }
};
