import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const EcommerceProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const product = {
    name: 'Premium Leather Backpack',
    price: 129.99,
    description: 'A stylish and durable leather backpack perfect for everyday use or travel. Features multiple compartments and adjustable straps for comfort.',
    rating: 4.5,
    reviews: [
      { id: 1, user: 'John D.', rating: 5, comment: 'Excellent quality and very spacious!' },
      { id: 2, user: 'Sarah M.', rating: 4, comment: 'Love the design, but wish it had more color options.' },
    ],
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['Brown', 'Black', 'Tan'],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1349&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      'https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1336&q=80',
    ],
  };

  const relatedProducts = [
    { id: 1, name: 'Leather Messenger Bag', price: 99.99, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2338&q=80' },
    { id: 2, name: 'Canvas Tote Bag', price: 49.99, image: 'https://images.unsplash.com/photo-1614179689702-355944cd0918?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80' },
    { id: 3, name: 'Hiking Backpack', price: 159.99, image: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1336&q=80' },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setZoomActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleZoom = (e) => {
    if (zoomActive) {
      const image = e.target;
      const { left, top, width, height } = image.getBoundingClientRect();
      const x = (e.clientX - left) / width * 100;
      const y = (e.clientY - top) / height * 100;
      setZoomPosition({ x, y });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="relative">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-lg"
              onMouseEnter={() => setZoomActive(true)}
              onMouseLeave={() => setZoomActive(false)}
              onMouseMove={handleZoom}
              style={zoomActive ? {
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                transform: 'scale(2)',
                transition: 'transform 0.2s'
              } : {}}
            />
            {zoomActive && (
              <div className="absolute top-2 right-2 bg-white bg-opacity-75 rounded-full p-2">
                <FaSearch className="text-gray-600" />
              </div>
            )}
          </div>
          <div className="flex mt-4 space-x-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex mr-2">{renderStars(product.rating)}</div>
            <span className="text-gray-600">{product.rating.toFixed(1)} ({product.reviews.length} reviews)</span>
          </div>
          <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Size:</h3>
            <div className="flex space-x-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-md ${selectedSize === size ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Color:</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full ${selectedColor === color ? 'ring-2 ring-blue-500' : ''}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Quantity:</h3>
            <div className="flex items-center space-x-2">
              <button
                className="px-2 py-1 rounded-md bg-gray-200 text-gray-800"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                className="px-2 py-1 rounded-md bg-gray-200 text-gray-800"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-600 transition duration-300 flex items-center justify-center">
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
        {product.reviews.map((review) => (
          <div key={review.id} className="mb-4 p-4 bg-gray-100 rounded-md">
            <div className="flex items-center mb-2">
              <div className="flex mr-2">{renderStars(review.rating)}</div>
              <span className="font-semibold">{review.user}</span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 transition duration-300">
          Write a Review
        </button>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="flex flex-wrap -mx-4">
          {relatedProducts.map((product) => (
            <motion.div
              key={product.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  <button className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 transition duration-300">
                    View Product
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcommerceProductPage;