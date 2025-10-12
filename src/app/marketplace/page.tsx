"use client";

import { useState, useEffect } from "react";
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
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

// Define Product and CartItem types
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
  shopifyVariantId?: string; // Optional: Map to actual Shopify variant IDs
}

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export default function Marketplace() {
  const ARIZONA_TAX_RATE = 0.056; // Arizona state tax rate 5.6%

  const products: Product[] = [
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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [shopifyStoreUrl, setShopifyStoreUrl] = useState<string>("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Fetch Shopify store URL from settings
  useEffect(() => {
    const fetchShopifyUrl = async () => {
      try {
        const response = await fetch("/api/settings?key=shopify_store_url");
        if (response.ok) {
          const data = await response.json();
          setShopifyStoreUrl(data.setting_value || "");
        }
      } catch (error) {
        console.error("Error fetching Shopify URL:", error);
      }
    };
    fetchShopifyUrl();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Add to cart function
  const addToCart = (product: Product, size: string, color: string) => {
    const existingItemIndex = cart.findIndex(
      (item) =>
        item.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor === color
    );

    if (existingItemIndex > -1) {
      // Item exists, increase quantity
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += 1;
      setCart(newCart);
    } else {
      // Add new item
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
          selectedSize: size,
          selectedColor: color,
        },
      ]);
    }
    setIsCartOpen(true);
  };

  // Update quantity
  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const newCart = [...cart];
    newCart[index].quantity = newQuantity;
    setCart(newCart);
  };

  // Remove from cart
  const removeFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * ARIZONA_TAX_RATE;
  const total = subtotal + tax;

  // Get cart count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Handle Shopify checkout
  const handleCheckout = () => {
    if (!shopifyStoreUrl) {
      alert("Shopify store is not configured. Please contact support.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    setIsCheckingOut(true);

    try {
      // Remove trailing slash from store URL if present
      const baseUrl = shopifyStoreUrl.replace(/\/$/, "");

      // Build Shopify checkout URL with cart items
      // Shopify cart URL format: https://store.myshopify.com/cart/VARIANT_ID:QUANTITY,VARIANT_ID:QUANTITY
      // Note: In production, replace product IDs with actual Shopify variant IDs
      // You can add shopifyVariantId to each product in the database

      const cartItems = cart
        .map((item) => {
          // Use shopifyVariantId if available, otherwise fall back to product ID
          const variantId = item.shopifyVariantId || `${item.id}`;
          return `${variantId}:${item.quantity}`;
        })
        .join(",");

      // Construct the Shopify checkout URL
      const checkoutUrl = `${baseUrl}/cart/${cartItems}`;

      // Log for debugging (remove in production)
      console.log("Redirecting to Shopify checkout:", checkoutUrl);

      // Redirect to Shopify checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("There was an error processing your checkout. Please try again.");
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 nav-hover-pop"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl flex flex-col">
            {/* Cart Header */}
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-2" />
                  Shopping Cart
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-indigo-100 text-sm">
                {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
              </p>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Add some items to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500 mb-2">
                            Size: {item.selectedSize} • Color:{" "}
                            {item.selectedColor}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center bg-white rounded-lg border border-gray-200">
                              <button
                                onClick={() =>
                                  updateQuantity(index, item.quantity - 1)
                                }
                                className="p-1 hover:bg-gray-100 rounded-l-lg transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-3 h-3 text-gray-600" />
                              </button>
                              <span className="px-3 py-1 text-sm font-medium text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(index, item.quantity + 1)
                                }
                                className="p-1 hover:bg-gray-100 rounded-r-lg transition-colors"
                              >
                                <Plus className="w-3 h-3 text-gray-600" />
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-indigo-600">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <button
                                onClick={() => removeFromCart(index)}
                                className="text-xs text-red-500 hover:text-red-700 flex items-center mt-1"
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer with Totals */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (Arizona 5.6%):</span>
                    <span className="font-medium text-gray-900">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        Total:
                      </span>
                      <span className="text-lg font-bold text-indigo-600">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || !shopifyStoreUrl}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold py-3 rounded-full hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  title={
                    !shopifyStoreUrl ? "Shopify checkout is not configured" : ""
                  }
                >
                  {isCheckingOut
                    ? "Redirecting to Checkout..."
                    : "Proceed to Checkout"}
                </button>
                {!shopifyStoreUrl && (
                  <p className="text-xs text-center text-red-600 mt-2">
                    Checkout is currently unavailable. Please contact support.
                  </p>
                )}
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full mt-2 bg-white text-gray-700 font-medium py-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="relative py-16 lg:py-20 bg-gradient-to-br from-indigo-600 via-indigo-650 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

        {/* Shopify Status Indicator (for debugging - remove in production) */}
        {process.env.NODE_ENV === "development" && (
          <div className="absolute top-4 right-4 z-10">
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                shopifyStoreUrl
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {shopifyStoreUrl
                ? "✓ Shopify Connected"
                : "✗ Shopify Not Configured"}
            </div>
          </div>
        )}

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
              {filteredProducts.map((product) => {
                const ProductCard = () => {
                  const [selectedSize, setSelectedSize] = useState(
                    product.sizes[0]
                  );
                  const [selectedColor, setSelectedColor] = useState(
                    product.colors[0]
                  );

                  return (
                    <div
                      key={product.id}
                      className="glass-card rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 group hover-lift"
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

                        {/* Size Selection */}
                        <div className="mb-3">
                          <label className="text-xs text-gray-700 font-medium mb-1 block">
                            Size:
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {product.sizes.map((size) => (
                              <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`text-xs px-3 py-1.5 rounded-lg transition-all duration-300 ${
                                  selectedSize === size
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Color Selection */}
                        <div className="mb-4">
                          <label className="text-xs text-gray-700 font-medium mb-1 block">
                            Color:
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {product.colors.map((color) => (
                              <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`text-xs px-3 py-1.5 rounded-lg transition-all duration-300 ${
                                  selectedColor === color
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {color}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Price and Action */}
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-indigo-600">
                            ${product.price}
                          </div>
                          <button
                            onClick={() =>
                              addToCart(product, selectedSize, selectedColor)
                            }
                            className="btn-primary text-sm px-4 py-2 flex items-center gap-2 hover:shadow-lg transition-all duration-300"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                };

                return <ProductCard key={product.id} />;
              })}
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
