
// import React, { useState, useEffect } from 'react';
// import { getDatabase, ref, onValue, update, increment } from "firebase/database";
// import app from './_utils/firebase';

// const ProductRow = ({ id, name, onIncrement, onDecrement, onDelete, quantity }) => {
//     return (
//         <div className="flex justify-between items-center text-white my-2 p-2 bg-[#0f0529] rounded">
//             <span>{name}</span>
//             <div>
//                 <button onClick={onDecrement} className="bg-[#ca8a04] p-1 mx-1">-</button>
//                 <span className="mx-2 text-white">{quantity}</span>
//                 <button onClick={onIncrement} className="bg-[#ca8a04] p-1 mx-1">+</button>
//                 <button onClick={() => onDelete(id)} className="bg-red-600 text-white p-1 mx-1">Delete</button>
//             </div>
//         </div>
//     );
// };

// function StockInsertion({ onBack }) {
//     const [products, setProducts] = useState([]);
//     const [drinks, setDrinks] = useState([]);
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
//         const existingProduct = products.find(p => p.firebaseId === drink.firebaseId);
//         if (existingProduct) {
//             existingProduct.quantity++;
//             setProducts([...products]);
//         } else {
//             setProducts([...products, { ...drink, quantity: 1, firebaseId: drink.firebaseId }]);
//         }
//         setSearchTerm(''); // Clear the search input after adding
//     };

//     const incrementQuantity = (firebaseId) => {
//         const newProducts = products.map(product => {
//             if (product.firebaseId === firebaseId) {
//                 return { ...product, quantity: product.quantity + 1 };
//             }
//             return product;
//         });
//         setProducts(newProducts);
//     };

//     const decrementQuantity = (firebaseId) => {
//         const newProducts = products.map(product => {
//             if (product.firebaseId === firebaseId && product.quantity > 1) {
//                 return { ...product, quantity: product.quantity - 1 };
//             }
//             return product;
//         });
//         setProducts(newProducts);
//     };

//     const handleDelete = (firebaseId) => {
//         setProducts(products.filter(product => product.firebaseId !== firebaseId));
//     };

//     const updateData = () => {
//         const db = getDatabase(app);
//         const updates = {};
//         products.forEach(product => {
//             // Using increment to update the quantity atomically
//             updates[`/drinks/${product.firebaseId}/quantity`] = increment(product.quantity);
//         });
//         update(ref(db), updates)
//             .then(() => alert('Inventory updated successfully!'))
//             .catch(error => {
//                 console.error('Failed to update inventory:', error);
//                 alert('Failed to update inventory.');
//             });
//     };

//     const filteredDrinks = drinks.filter(drink => drink.bottle_name.toLowerCase().includes(searchTerm.toLowerCase()));

//     return (
//         <div className="min-h-screen bg-[#0f0529] text-white p-4">
//             <button onClick={onBack} className="bg-[#ca8a04] p-2 ml-2 rounded">Back</button>
//             <input 
//                 type="text" 
//                 placeholder="Enter product name"
//                 className="p-2 rounded bg-white flex-grow"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />
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
//                         key={product.firebaseId}
//                         id={product.firebaseId}
//                         name={product.bottle_name}
//                         quantity={product.quantity}
//                         onIncrement={() => incrementQuantity(product.firebaseId)}
//                         onDecrement={() => decrementQuantity(product.firebaseId)}
//                         onDelete={() => handleDelete(product.firebaseId)}
//                     />
//                 ))}
//             </div>
//             <button onClick={updateData} className="mt-4 bg-[#ca8a04] p-2 rounded w-full">Receive</button>
//         </div>
//     );
// }

// export default StockInsertion;
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update, increment } from "firebase/database";
import app from './_utils/firebase';

const ProductRow = ({ id, name, onIncrement, onDecrement, onDelete, quantity }) => {
    return (
        <div className="flex justify-between items-center text-white my-2 p-2 bg-[#0f0529] rounded">
            <span>{name}</span>
            <div>
                <button onClick={onDecrement} className="bg-[#ca8a04] p-1 mx-1">-</button>
                <span className="mx-2 text-white">{quantity}</span>
                <button onClick={onIncrement} className="bg-[#ca8a04] p-1 mx-1">+</button>
                <button onClick={() => onDelete(id)} className="bg-red-600 text-white p-1 mx-1">Delete</button>
            </div>
        </div>
    );
};

function StockInsertion({ onBack }) {
    const [products, setProducts] = useState([]);
    const [drinks, setDrinks] = useState([]);
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
        const existingProduct = products.find(p => p.firebaseId === drink.firebaseId);
        if (existingProduct) {
            existingProduct.quantity++;
            setProducts([...products]);
        } else {
            setProducts([...products, { ...drink, quantity: 1, firebaseId: drink.firebaseId }]);
        }
        setSearchTerm(''); // Clear the search input after adding
    };

    const incrementQuantity = (firebaseId) => {
        const newProducts = products.map(product => {
            if (product.firebaseId === firebaseId) {
                return { ...product, quantity: product.quantity + 1 };
            }
            return product;
        });
        setProducts(newProducts);
    };

    const decrementQuantity = (firebaseId) => {
        const newProducts = products.map(product => {
            if (product.firebaseId === firebaseId && product.quantity > 1) {
                return { ...product, quantity: product.quantity - 1 };
            }
            return product;
        });
        setProducts(newProducts);
    };

    const handleDelete = (firebaseId) => {
        setProducts(products.filter(product => product.firebaseId !== firebaseId));
    };

    const updateData = () => {
        const db = getDatabase(app);
        const updates = {};
        products.forEach(product => {
            // Using increment to update the quantity atomically
            updates[`/drinks/${product.firebaseId}/quantity`] = increment(product.quantity);
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
        <div className="min-h-screen bg-[#0f0529] text-black p-4">
           <div className="flex justify-between items-center mb-4">
                <input 
                    type="text" 
                    placeholder="Enter product name or SKU" 
                    className="p-2 rounded bg-white flex-grow" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={onBack} className="bg-[#ca8a04] p-2 ml-2 rounded">Back</button>
            </div>

            {searchTerm && (
                <div className="absolute bg-white text-black max-h-40 overflow-auto w-full">
                    {filteredDrinks.map(drink => (
                        <div key={drink.firebaseId} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleAddProduct(drink)}>
                            {drink.bottle_name} ({drink.SKU})
                        </div>
                    ))}
                </div>
            )}
            <div>
                {products.map((product) => (
                    <ProductRow
                        key={product.firebaseId}
                        id={product.firebaseId}
                        name={product.bottle_name}
                        quantity={product.quantity}
                        onIncrement={() => incrementQuantity(product.firebaseId)}
                        onDecrement={() => decrementQuantity(product.firebaseId)}
                        onDelete={() => handleDelete(product.firebaseId)}
                    />
                ))}
            </div>
            <button onClick={updateData} className="mt-4 bg-[#ca8a04] p-2 rounded w-full">Receive</button>
        </div>
    );
}

export default StockInsertion;
