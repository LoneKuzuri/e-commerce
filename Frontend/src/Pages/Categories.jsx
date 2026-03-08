import React from 'react';
import CategoryList from "../components/CategoryList";

function Categories({ selectedCategory, setSelectedCategory, setActiveTab }) {
  const handleBrowseAll = () => {
    setSelectedCategory(null); // Reset category filter
    setActiveTab('home'); // Redirect to ProductList
    setTimeout(() => {
      const productList = document.querySelector('.product-list-section');
      if (productList) productList.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-40 h-40 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full animate-float-gentle"></div>
        <div className="absolute top-32 right-16 w-28 h-28 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full animate-float-reverse-gentle"></div>
        <div className="absolute bottom-24 left-1/3 w-36 h-36 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full animate-float-slow-gentle"></div>
        <div className="absolute bottom-40 right-1/4 w-32 h-32 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full animate-float-delayed-gentle"></div>
      </div>

      <div className="relative z-10 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center animate-fade-in-down">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-text-shimmer">
              All Categories
            </h2>
            <div className="flex items-center justify-center space-x-4 mb-6 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent animate-expand-horizontal"></div>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              </div>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent via-indigo-500 to-transparent animate-expand-horizontal"></div>
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.5s' }}>
              Discover our wide range of quality products organized by category. 
              <span className="block mt-1 text-violet-600 font-semibold animate-text-glow">
                Find exactly what you're looking for!
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/50 transform hover:-translate-y-1 transition-all duration-300 animate-slide-in-left">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse-gentle">
                  <span className="text-white font-bold text-lg">📦</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Premium Quality</h3>
                  <p className="text-gray-600 text-sm">Carefully selected products</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/50 transform hover:-translate-y-1 transition-all duration-300 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse-gentle" style={{ animationDelay: '0.2s' }}>
                  <span className="text-white font-bold text-lg">💰</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Best Prices</h3>
                  <p className="text-gray-600 text-sm">Wholesale rates guaranteed</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/50 transform hover:-translate-y-1 transition-all duration-300 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center animate-pulse-gentle" style={{ animationDelay: '0.4s' }}>
                  <span className="text-white font-bold text-lg">⚡</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Fast Service</h3>
                  <p className="text-gray-600 text-sm">Quick and reliable delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-8 animate-scale-in">
            <CategoryList 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <div 
          onClick={handleBrowseAll}
          className="bg-gradient-to-r from-violet-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 cursor-pointer animate-float group"
        >
          <div className="flex items-center space-x-2">
            <span className="text-2xl group-hover:animate-bounce">🛍️</span>
            <span className="hidden sm:inline font-semibold">Browse All</span>
          </div>
        </div>
      </div>

      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 animate-slide-progress"></div>
      </div>
    </section>
  );
}

export default Categories;