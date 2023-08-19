// pages/api/brands.js
import products from './data'; // Assuming you have a data file with product information

export default async (req, res) => {
  res.status(200).json(products);
};
