import React, { useState, useEffect } from 'react';
import Dropdown from '../components/Dropdown';
import ProductList from '../components/ProductList';

const Home = () => {
  const [brands, setBrands] = useState({});
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsResponse = await fetch('/api/products');
      const brandsResponse = await fetch('/api/brands');
      const productsData = await productsResponse.json();
      const brandsData = await brandsResponse.json();
      setBrands(brandsData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      const selectedBrandModels = Object.keys(brands[selectedBrand] || {});
      setModels(selectedBrandModels);
      setSelectedModel('');
      setSelectedYear('');
    }
  }, [selectedBrand, brands]);

  useEffect(() => {
    if (selectedBrand && selectedModel) {
      const selectedBrandModelYears =
        brands[selectedBrand]?.[selectedModel] || [];
      setYears(selectedBrandModelYears);
      setSelectedYear('');
    }
  }, [selectedBrand, selectedModel, brands]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/products');
      const allProducts = await response.json();

      const filteredProducts = allProducts.filter(
        (product) =>
          (!selectedBrand || product.brand === selectedBrand) &&
          (!selectedModel || product.model === selectedModel) &&
          (!selectedYear || product.year === selectedYear)
      );

      setFilteredProducts(filteredProducts);
    };

    fetchData();
  }, [selectedBrand, selectedModel, selectedYear]);

  return (
    <main>
      <div className="bg-hero-image bg-cover bg-center h-screen">
        <div className="bg-black bg-opacity-50 h-full">
          <div className="container mx-auto px-4 md:px-8 h-full flex flex-col justify-center text-white">
            <h1 className="text-4xl font-semibold mb-4">Car Parts Store</h1>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Dropdown
                label="Brand"
                options={brands ? Object.keys(brands) : []}
                selected={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setSelectedModel('');
                  setSelectedYear('');
                }}
              />
              <Dropdown
                label="Model"
                options={
                  selectedBrand ? Object.keys(brands[selectedBrand]) : []
                }
                selected={selectedModel}
                onChange={(e) => {
                  setSelectedModel(e.target.value);
                  setSelectedYear('');
                }}
              />
              <Dropdown
                label="Year"
                options={
                  selectedBrand && selectedModel
                    ? brands[selectedBrand][selectedModel] || []
                    : []
                }
                selected={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-8">
        <h2 className="text-xl font-semibold mt-8 mb-4">Available Products</h2>
        <ProductList products={filteredProducts} />
      </div>
    </main>
  );
};

export default Home;
