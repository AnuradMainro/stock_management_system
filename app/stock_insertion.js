"use client";
import React, { useState } from 'react';

const ProductRow = ({ name, onIncrement, onDecrement, quantity }) => {
    return (
        <div className="flex justify-between items-center my-2 p-2 bg-purple-700 rounded">
            <span>{name}</span>
            <div>
                <button onClick={onDecrement} className="bg-yellow-600 p-1 mx-1">-</button>
                <span className="mx-2">{quantity}</span>
                <button onClick={onIncrement} className="bg-yellow-600 p-1 mx-1">+</button>
            </div>
        </div>
    );
};

function StockInsertion({ onBack }) {
    const [products, setProducts] = useState([
        { id: 1, name: "Product Name", quantity: 0 },
        { id: 2, name: "Product Name", quantity: 0 },
        { id: 3, name: "Product Name", quantity: 0 },
        { id: 4, name: "Product Name", quantity: 0 },
        { id: 5, name: "Product Name", quantity: 0 }
    ]);

    const incrementQuantity = (id) => {
        const newProducts = products.map(product => {
            if (product.id === id) {
                return { ...product, quantity: product.quantity + 1 };
            }
            return product;
        });
        setProducts(newProducts);
    };

    const decrementQuantity = (id) => {
        const newProducts = products.map(product => {
            if (product.id === id && product.quantity > 0) {
                return { ...product, quantity: product.quantity - 1 };
            }
            return product;
        });
        setProducts(newProducts);
    };

    const handleReceive = () => {
        console.log("Received inventory: ", products);
    };

    return (
        <div className="min-h-screen bg-purple-800 text-white p-4">
            <div className="flex justify-between items-center mb-4">
                <input 
                    type="text" 
                    placeholder="Search for product" 
                    className="p-2 rounded bg-purple-700" 
                />
                <button onClick={onBack} className="bg-yellow-600 p-2 rounded">Back</button>
            </div>
            <div>
                {products.map((product) => (
                    <ProductRow
                        key={product.id}
                        name={product.name}
                        quantity={product.quantity}
                        onIncrement={() => incrementQuantity(product.id)}
                        onDecrement={() => decrementQuantity(product.id)}
                    />
                ))}
            </div>
            <button onClick={handleReceive} className="w-full mt-4 bg-yellow-600 p-3 rounded">Receive</button>
        </div>
    );
}

export default StockInsertion;
