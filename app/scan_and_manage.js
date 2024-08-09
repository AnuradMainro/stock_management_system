"use client";
import React, { useState, useEffect } from 'react';

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

function ScanAndManage({ onBack, onNavigate }) {
    const [drinks, setDrinks] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch('/drinks.json')
            .then(response => response.json())
            .then(data => {
                setDrinks(data.drinks);
            })
            .catch(error => console.error('Error loading drinks data:', error));
    }, []);

    const handleAddProduct = (drink) => {
        const newProduct = {
            id: drink.SKU,
            name: drink.bottle_name,
            quantity: 1
        };
        const productIndex = products.findIndex(product => product.id === newProduct.id);
        if (productIndex === -1) {
            setProducts([...products, newProduct]);
        } else {
            const newProducts = [...products];
            newProducts[productIndex].quantity += 1;
            setProducts(newProducts);
        }
        setSearchTerm(""); 
    };

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
        setProducts(products.filter(product => product.id !== id));
    };

    const filteredDrinks = searchTerm ? drinks.filter(drink => drink.bottle_name.toLowerCase().includes(searchTerm.toLowerCase())) : [];

    return (
        <div className="h-screen bg-gradient-to-b from-purple-500 to-[#0F0529] text-black p-4">
            <div className="flex justify-between items-center mb-4">
                <input 
                    type="text"
                    placeholder="Enter product name"
                    className="p-2 rounded bg-white flex-grow"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={() => onNavigate('stockInsertion')} className="bg-yellow-600 p-2 ml-2 rounded">Return</button>
                <button onClick={onBack} className="bg-yellow-600 p-2 ml-2 rounded">Back</button>
            </div>
            {searchTerm && (
                <div className="absolute bg-white text-black max-h-40 overflow-auto w-full">
                    {filteredDrinks.map(drink => (
                        <div key={drink.SKU} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleAddProduct(drink)}>
                            {drink.bottle_name}
                        </div>
                    ))}
                </div>
            )}
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

export default ScanAndManage;
