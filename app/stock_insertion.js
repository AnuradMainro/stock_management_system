"use client";
import React, { useState } from 'react';

const ProductRow = ({ id, name, onIncrement, onDecrement, onDelete, quantity }) => {
    return (
        <div className="flex justify-between items-center my-2 p-2 bg-purple-700 rounded">
            <span>{name}</span>
            <div>
                <button onClick={onDecrement} className="bg-yellow-600 p-1 mx-1">-</button>
                <span className="mx-2">{quantity}</span>
                <button onClick={onIncrement} className="bg-yellow-600 p-1 mx-1">+</button>
                <button onClick={() => onDelete(id)} className="bg-red-600 p-1 mx-1">Delete</button>
            </div>
        </div>
    );
};

function StockInsertion({ onBack }) {
    const [products, setProducts] = useState([]);  // Start with an empty array
    const [newProductName, setNewProductName] = useState("");

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

    const handleDelete = (id) => {
        const newProducts = products.filter(product => product.id !== id);
        setProducts(newProducts);
    };

    const addProduct = () => {
        const newProduct = {
            id: products.reduce((maxId, product) => Math.max(product.id, maxId), 0) + 1,  // Ensures a unique ID
            name: newProductName,
            quantity: 0
        };
        setProducts([...products, newProduct]);
        setNewProductName(""); // Reset the input field
    };

    return (
        <div className="min-h-screen bg-purple-800 text-white p-4">
            <div className="flex justify-between items-center mb-4">
                <input 
                    type="text" 
                    placeholder="Enter new product name"
                    className="p-2 rounded bg-purple-700 flex-grow"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                />
                <button onClick={addProduct} className="bg-yellow-600 p-2 ml-2 rounded">Add</button>
                <button onClick={onBack} className="bg-yellow-600 p-2 ml-2 rounded">Back</button>
            </div>
            <div>
                {products.map((product) => (
                    <ProductRow
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        quantity={product.quantity}
                        onIncrement={() => incrementQuantity(product.id)}
                        onDecrement={() => decrementQuantity(product.id)}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default StockInsertion;
