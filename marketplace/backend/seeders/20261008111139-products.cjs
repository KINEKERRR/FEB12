"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("products", [
      {
        name: "Moondrop Chu II",
        description: "Внутриканальные наушники Moondrop Chu II.",
        price: 2490,
        image: "/images/moondrop-chu-2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: "KZ ZS10 Pro 2",
        description: "Гибридные внутриканальные наушники KZ.",
        price: 3990,
        image: "/images/kz-zs10-pro-2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: "TRN Conch",
        description: "Внутриканальные наушники TRN Conch.",
        price: 3290,
        image: "/images/trn-conch.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: "Tanchjim One",
        description: "Компактные внутриканальные наушники Tanchjim.",
        price: 2890,
        image: "/images/tanchjim-one.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: "Moondrop Aria 2",
        description: "Внутриканальные наушники Moondrop Aria 2.",
        price: 8990,
        image: "/images/moondrop-aria-2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
