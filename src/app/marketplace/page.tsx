"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Shirt,
  Coffee,
  Star,
  Heart,
  CheckCircle,
  Gift,
  ArrowLeft,
  Tag,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";

export default function Marketplace() {
  const products = [
    {
      id: 1,
      name: "NMTSA Classic T-Shirt",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&crop=center",
      category: "Apparel",
      description: "Comfortable cotton t-shirt featuring the NMTSA logo",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Navy", "White", "Gray"],
    },
    {
      id: 2,
      name: "Music Therapy Mug",
      price: 16.99,
      image:
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop&crop=center",
      category: "Drinkware",
      description: "Ceramic mug with inspiring music therapy message",
      sizes: ["11oz", "15oz"],
      colors: ["White", "Blue"],
    },
    {
      id: 3,
      name: "NMTSA Hoodie",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop&crop=center",
      category: "Apparel",
      description: "Cozy hoodie perfect for showing your support",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Navy", "Gray", "Maroon"],
    },
    {
      id: 4,
      name: "Harmony Tote Bag",
      price: 18.99,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center",
      category: "Accessories",
      description: "Eco-friendly tote bag with musical note design",
      sizes: ["One Size"],
      colors: ["Natural", "Navy"],
    },
    {
      id: 5,
      name: "Water Bottle",
      price: 22.99,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop&crop=center",
      category: "Drinkware",
      description: "Stainless steel water bottle with NMTSA branding",
      sizes: ["20oz", "32oz"],
      colors: ["Silver", "Black", "Blue"],
    },
    {
      id: 6,
      name: "Inspirational Journal",
      price: 14.99,
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop&crop=center",
      category: "Gifts",
      description: "Hardcover journal with music therapy quotes",
      sizes: ["5x7", "8x10"],
      colors: ["Blue", "Green", "Purple"],
    },
  ];

  const categories = ["All", "Apparel", "Drinkware", "Accessories", "Gifts"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-20 bg-gradient-to-br from-indigo-600 via-indigo-650 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

        <div className="container-responsive relative">
          {/* Back to Donate Link */}
          <div className="mb-6">
            <Link
              href="/donate"
              className="inline-flex items-center text-indigo-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Donate
            </Link>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-bold font-poppins mb-6 text-4xl sm:text-5xl lg:text-6xl">
              🛍️ NMTSA <span className="text-indigo-200">Marketplace</span>
            </h1>
            <p className="text-indigo-100 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed mb-8">
              Shop our collection of branded merchandise and support music
              therapy programs. Every purchase makes a difference in the lives
              of individuals with neurologic impairments.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm text-indigo-200">
                  Free Shipping $50+
                </div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <RotateCcw className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm text-indigo-200">30-Day Returns</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm text-indigo-200">Secure Checkout</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm text-indigo-200">Supports Therapy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container-responsive">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === selectedCategory
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container-responsive">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try selecting a different category.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Product Image */}
                  <div className="aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                        <Star className="w-3 h-3 text-yellow-400 mr-1" />
                        <span className="text-xs text-gray-700">4.8</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-indigo-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Options */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        <span className="text-xs text-gray-500">Sizes:</span>
                        {product.sizes.map((size) => (
                          <span
                            key={size}
                            className="text-xs bg-gray-100 px-2 py-1 rounded"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-gray-500">Colors:</span>
                        {product.colors.map((color) => (
                          <span
                            key={color}
                            className="text-xs bg-gray-100 px-2 py-1 rounded"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-indigo-600">
                        ${product.price}
                      </div>
                      <button className="btn-primary text-sm px-4 py-2">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="font-bold font-poppins text-gray-900 mb-6 text-3xl sm:text-4xl lg:text-5xl">
              Your Purchase{" "}
              <span className="gradient-text">Makes a Difference</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
              Every item you buy directly supports our music therapy programs
              and helps transform lives in our community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Direct Impact
              </h3>
              <p className="text-gray-600">
                100% of profits go directly to funding music therapy sessions
                and programs.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Spread Awareness
              </h3>
              <p className="text-gray-600">
                Wearing NMTSA merchandise helps spread awareness about music
                therapy.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Quality Products
              </h3>
              <p className="text-gray-600">
                High-quality materials and designs that you&apos;ll love to use
                and wear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container-responsive text-center">
          <h2 className="font-bold font-poppins mb-6 text-3xl sm:text-4xl lg:text-5xl">
            Need Help or Have Questions?
          </h2>
          <p className="text-indigo-100 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed mb-8">
            Our team is here to help with custom orders, bulk purchases, or any
            questions about our merchandise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link
              href="/contact?form=merchandise"
              className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full inline-flex items-center justify-center hover:bg-indigo-50 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Contact Support
            </Link>
            <Link
              href="/contact?form=custom-order"
              className="border-2 border-white text-white font-semibold px-6 py-3 rounded-full inline-flex items-center justify-center hover:bg-white hover:text-indigo-600 transition-colors"
            >
              <Tag className="w-5 h-5 mr-2" />
              Custom Orders
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
