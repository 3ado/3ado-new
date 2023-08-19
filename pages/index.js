// pages/index.js
import React, { useState, useEffect } from 'react';
import Dropdown from '../components/Dropdown';
import ProductList from '../components/ProductList';

const Home = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const products = [
    {
      brand: 'Ford',
      model: 'Sedan',
      year: '2020',
      name: 'Product 1',
      description: 'Description of Product 1',
      price: 100,
    },
    {
      brand: 'Renault',
      model: 'SUV',
      year: '2021',
      name: 'Product 2',
      description: 'Description of Product 2',
      price: 150,
    },
    {
      brand: 'Toyota',
      model: 'Hatchback',
      year: '2022',
      name: 'Product 3',
      description: 'Description of Product 3',
      price: 200,
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      (!selectedBrand || product.brand === selectedBrand) &&
      (!selectedModel || product.model === selectedModel) &&
      (!selectedYear || product.year === selectedYear)
  );

  useEffect(() => {
    // Retrieve brands, models, and years from products
    const uniqueBrands = Array.from(
      new Set(products.map((product) => product.brand))
    );
    const uniqueModels = Array.from(
      new Set(products.map((product) => product.model))
    );
    const uniqueYears = Array.from(
      new Set(products.map((product) => product.year))
    );

    setBrands(uniqueBrands);
    setModels(uniqueModels);
    setYears(uniqueYears);
  }, []);

  useEffect(() => {
    // Simulate fetching products based on selectedBrand, selectedModel, selectedYear
    // You can replace this with your actual API calls
  }, [selectedBrand, selectedModel, selectedYear]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Car Parts Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Dropdown
          label="Brand"
          options={brands}
          selected={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        />
        <Dropdown
          label="Model"
          options={models}
          selected={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        />
        <Dropdown
          label="Year"
          options={years}
          selected={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        />
      </div>
      <h2 className="text-xl font-semibold mt-8 mb-4">Available Products</h2>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Home;
