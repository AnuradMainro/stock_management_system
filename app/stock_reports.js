import React from 'react';
import Link from 'next/link';

function StockReports() {
    // Placeholder data for categories and brands
    const categories = Array(8).fill("Category");
    const brands = Array(4).fill("Brand");

    return (
        <div className="bg-purple-800 min-h-screen p-4 text-white">
            <div className="flex justify-between items-center mb-6">
                <input 
                    type="text" 
                    placeholder="Search for product" 
                    className="p-2 rounded bg-purple-700 flex-grow mr-4"
                />
                <Link href="/dashboard">
                    <button className="bg-yellow-600 p-2 rounded">Back</button>
                </Link>
            </div>
            <div>
                <h2 className="font-bold text-xl mb-4">Categories</h2>
                <div className="grid grid-cols-4 gap-4">
                    {categories.map((category, index) => (
                        <div key={index} className="bg-purple-700 p-3 rounded hover:bg-purple-600 cursor-pointer">Category</div>
                    ))}
                </div>
                <button className="mt-4 mb-6 text-yellow-600">see more</button>
            </div>
            <div>
                <h2 className="font-bold text-xl mb-4">Popular Brands</h2>
                <div className="grid grid-cols-4 gap-4">
                    {brands.map((brand, index) => (
                        <div key={index} className="bg-purple-700 p-3 rounded hover:bg-purple-600 cursor-pointer">Brand</div>
                    ))}
                </div>
                <button className="mt-4 text-yellow-600">see more</button>
            </div>
        </div>
    );
}

export default StockReports;
