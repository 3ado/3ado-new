// pages/api/brands.js
import products from './data'; // Assuming you have a data file with product information

export default async (req, res) => {
  const brands = {};

  products.forEach((product) => {
    if (!brands[product.brand]) {
      brands[product.brand] = {};
    }

    if (!brands[product.brand][product.model]) {
      brands[product.brand][product.model] = [];
    }

    brands[product.brand][product.model].push(product.year);
  });

  res.status(200).json(brands);
};
