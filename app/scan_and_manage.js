
// import React, { useState, useEffect } from 'react';
// import { getDatabase, ref, onValue, update, increment } from "firebase/database";
// import app from './_utils/firebase'; // Ensure this path matches your Firebase config import

// const ProductRow = ({ id, name, onIncrement, onDecrement, onDelete, quantity }) => {
//     return (
//         <div className="flex justify-between items-center text-white my-2 p-2 bg-[#0f0529] rounded">
//             <span>{name}</span>
//             <div>
//                 <button onClick={onDecrement} className="bg-[#ca8a04] p-1 mx-1">-</button>
//                 <span className="mx-2">{quantity}</span>
//                 <button onClick={onIncrement} className="bg-[#ca8a04] p-1 mx-1">+</button>
//                 <button onClick={() => onDelete(id)} className="bg-red-600 p-1 mx-1">Delete</button>
//             </div>
//         </div>
//     );
// };

// function ScanAndManage({ onBack, onNavigate }) {
//     const [drinks, setDrinks] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");

//     useEffect(() => {
//         const db = getDatabase(app);
//         const drinksRef = ref(db, 'drinks');
//         onValue(drinksRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const loadedDrinks = Object.keys(data).map(key => ({
//                     ...data[key],
//                     firebaseId: key
//                 }));
//                 setDrinks(loadedDrinks);
//             }
//         });
//     }, []);

//     const handleAddProduct = (drink) => {
//         const newProduct = {
//             id: drink.firebaseId,
//             name: drink.bottle_name,
//             quantity: 1
//         };
//         const productIndex = products.findIndex(product => product.id === newProduct.id);
//         if (productIndex === -1) {
//             setProducts([...products, newProduct]);
//         } else {
//             const newProducts = [...products];
//             newProducts[productIndex].quantity += 1;
//             setProducts(newProducts);
//         }
//         setSearchTerm(""); // Clear the search term after adding
//     };

//     const incrementQuantity = (id) => {
//         const newProducts = products.map(product => {
//             if (product.id === id) {
//                 return { ...product, quantity: product.quantity + 1 };
//             }
//             return product;
//         });
//         setProducts(newProducts);
//     };

//     const decrementQuantity = (id) => {
//         const newProducts = products.map(product => {
//             if (product.id === id && product.quantity > 0) {
//                 return { ...product, quantity: product.quantity - 1 };
//             }
//             return product;
//         });
//         setProducts(newProducts);
//     };

//     const handleDelete = (id) => {
//         setProducts(products.filter(product => product.id !== id));
//     };

//     const updateData = () => {
//         const db = getDatabase(app);
//         const updates = {};
//         products.forEach(product => {
//             updates[`/drinks/${product.id}/quantity`] = increment(-product.quantity);
//         });
//         update(ref(db), updates)
//             .then(() => alert('Inventory updated successfully!'))
//             .catch(error => {
//             console.error('Failed to update inventory:', error);
//             alert('Failed to update inventory.');
//         });
//     };

//     const filteredDrinks = drinks.filter(drink => drink.bottle_name.toLowerCase().includes(searchTerm.toLowerCase()));

//     return (
//         <div className="h-screen bg-[#0f0529] to-[#0F0529] text-black p-4">
//             <div className="flex justify-between items-center mb-4">
//                 <input 
//                     type="text" 
//                     placeholder="Enter product name" 
//                     className="p-2 rounded bg-white flex-grow" 
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <button onClick={() => onNavigate('stockInsertion')} className="bg-[#ca8a04] p-2 ml-2 rounded">Return</button>
//                 <button onClick={onBack} className="bg-[#ca8a04] p-2 ml-2 rounded">Back</button>
//             </div>
//             {searchTerm && (
//                 <div className="absolute bg-white text-black max-h-40 overflow-auto w-full">
//                     {filteredDrinks.map(drink => (
//                         <div key={drink.firebaseId} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleAddProduct(drink)}>
//                             {drink.bottle_name}
//                         </div>
//                     ))}
//                 </div>
//             )}
//             <div>
//                 {products.map((product) => (
//                     <ProductRow
//                         key={product.id}
//                         id={product.id}
//                         name={product.name}
//                         quantity={product.quantity}
//                         onIncrement={() => incrementQuantity(product.id)}
//                         onDecrement={() => decrementQuantity(product.id)}
//                         onDelete={handleDelete}
//                     />
//                 ))}
//             </div>
//             <button onClick={updateData} className="mt-4 bg-[#ca8a04] p-2 rounded w-full">Receive</button>
//         </div>
//     );
// }

// export default ScanAndManage;

import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update, increment } from "firebase/database";
import app from './_utils/firebase'; // Ensure this path matches your Firebase config import

const ProductRow = ({ id, name, onIncrement, onDecrement, onDelete, quantity }) => {
    return (
        <div className="flex justify-between items-center text-white my-2 p-2 bg-[#0f0529] rounded">
            <span>{name}</span>
            <div>
                <button onClick={onDecrement} className="bg-[#ca8a04] p-1 mx-1">-</button>
                <span className="mx-2">{quantity}</span>
                <button onClick={onIncrement} className="bg-[#ca8a04] p-1 mx-1">+</button>
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
        const db = getDatabase(app);
        const drinksRef = ref(db, 'drinks');
        onValue(drinksRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedDrinks = Object.keys(data).map(key => ({
                    ...data[key],
                    firebaseId: key
                }));
                setDrinks(loadedDrinks);
            }
        });
    }, []);

    const handleAddProduct = (drink) => {
        const newProduct = {
            id: drink.firebaseId,
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
        setSearchTerm(""); // Clear the search term after adding
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

    const updateData = () => {
        const db = getDatabase(app);
        const updates = {};
        products.forEach(product => {
            updates[`/drinks/${product.id}/quantity`] = increment(-product.quantity);
        });
        update(ref(db), updates)
            .then(() => alert('Inventory updated successfully!'))
            .catch(error => {
            console.error('Failed to update inventory:', error);
            alert('Failed to update inventory.');
        });
    };

    const filteredDrinks = drinks.filter(drink => 
        drink.bottle_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drink.SKU.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-screen bg-[#0f0529] to-[#0F0529] text-black p-4">
            <div className="flex justify-between items-center mb-4">
                <input 
                    type="text" 
                    placeholder="Enter product name or SKU" 
                    className="p-2 rounded bg-white flex-grow" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={() => onNavigate('stockInsertion')} className="bg-[#ca8a04] p-2 ml-2 rounded">Return</button>
                <button onClick={onBack} className="bg-[#ca8a04] p-2 ml-2 rounded">Back</button>
            </div>
            {searchTerm && (
                <div className="absolute bg-white text-black max-h-40 overflow-auto w-full">
                    {filteredDrinks.map(drink => (
                        <div key={drink.firebaseId} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleAddProduct(drink)}>
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
            <button onClick={updateData} className="mt-4 bg-[#ca8a04] p-2 rounded w-full">Receive</button>
        </div>
    );
}

export default ScanAndManage;
