'use strict';
// const { productList } = require ('../src/seeder/products'); 
const { faker } =  require('@faker-js/faker');
const productList = [];

const fakeRating = () => {
  const precision = 100; // 2 decimals
  const rate = Math.floor(Math.random() * (5 * precision - 1 * precision) + 1 * precision) / (1*precision);
  const count = Math.floor(Math.random() * (1000 - 0) + 0);
  return {
    rate,
    count,
  }
}

function createRandomProduct() {
  return {
    // id: faker.datatype.uuid(),
    title: faker.commerce.product(),
    price: Number(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    image: faker.image.fashion(),
    rate: fakeRating().rate,
    count: fakeRating().count,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

Array.from({ length: 10 }).forEach(() => {
  productList.push(createRandomProduct());
});


console.log('productList', productList)

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'products',
      // [{
      //   title: "Computer",
      //   price: 2000,
      //   description: "This is a dummy text",
      //   category: "Technology",
      //   image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
      //   rate: 4.2,
      //   count: 429,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // }],
      productList,
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
