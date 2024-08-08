import React from 'react';
import Link from 'next/link';
import Card from './components/card';

function StockReports() {
  return (
    <div className="bg-purple-800 min-h-screen">
      <div className="flex justify-between items-center p-4">
        <Link href="/dashboard">
          <a className="text-yellow-600 font-bold">Back</a>
        </Link>
        <div className="flex items-center">
          <input type="text" placeholder="Search for product" className="p-2 rounded bg-purple-900 text-white placeholder-yellow-600" />
          <button className="ml-2 p-2 text-yellow-600"><i className="icon-settings"></i></button>
        </div>
      </div>

      <div className="p-4">
        <h1 className="text-yellow-600 text-xl mb-2">Categories</h1>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {/* Map through categories data here */}
          <div className="bg-purple-700 h-20"></div>
          {/* Repeat for each category */}
        </div>
        <a className="text-yellow-600 cursor-pointer">see more</a>
      </div>

      <div className="p-4">
        <h1 className="text-yellow-600 text-xl mb-2">Popular Brands</h1>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {/* Map through brands data here */}
          <div className="bg-purple-700 h-20"></div>
          {/* Repeat for each brand */}
        </div>
        <a className="text-yellow-600 cursor-pointer">see more</a>
      </div>
    </div>
  );
}

export default StockReports;
