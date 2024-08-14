import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update } from "firebase/database";
import app from '../_utils/firebase'; // Ensure this path matches your Firebase config import

function StockReports({ onBack }) {
    const [drinksByCategory, setDrinksByCategory] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [editingDrinkId, setEditingDrinkId] = useState(null); // To track which drink is being edited
    const [formData, setFormData] = useState({}); // To track form data for the drink being edited

    useEffect(() => {
        const db = getDatabase(app);
        const drinksRef = ref(db, 'drinks');
        onValue(drinksRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const categories = {};
                Object.keys(data).forEach((key) => {
                    const drink = { ...data[key], firebaseId: key };
                    if (!categories[drink.category]) {
                        categories[drink.category] = [];
                    }
                    categories[drink.category].push(drink);
                });
                setDrinksByCategory(categories);
            }
        });
    }, []);

    const handleEditClick = (drink) => {
        setEditingDrinkId(drink.firebaseId);
        setFormData({
            price: drink.price,
            quantity: drink.quantity,
            alcohol_percentage: drink.description.alcohol_percentage,
            notes: drink.description.notes,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveClick = () => {
        const db = getDatabase(app);
        const updates = {
            [`/drinks/${editingDrinkId}/price`]: formData.price,
            [`/drinks/${editingDrinkId}/quantity`]: formData.quantity,
            [`/drinks/${editingDrinkId}/description/alcohol_percentage`]: formData.alcohol_percentage,
            [`/drinks/${editingDrinkId}/description/notes`]: formData.notes,
        };

        update(ref(db), updates)
            .then(() => {
                alert('Data updated successfully!');
                setEditingDrinkId(null); // Exit edit mode after saving
            })
            .catch((error) => {
                console.error('Failed to update data:', error);
                alert('Failed to update data.');
            });
    };

    const handleCancelClick = () => {
        setEditingDrinkId(null); // Exit edit mode without saving
    };

    return (
        <div className="bg-gradient-to-b from-purple-500 to-[#0F0529] min-h-screen p-4 text-white">
            <button onClick={onBack} className="bg-[#ca8a04] p-2 rounded hover:bg-yellow-700">
                Back
            </button>
            <h1 className="text-xl font-bold my-4">Stock Reports</h1>
            {selectedCategory === null ? (
                Object.keys(drinksByCategory).map((category, index) => (
                    <button key={index} onClick={() => setSelectedCategory(category)} className="bg-purple-700 p-3 rounded hover:bg-purple-600 m-2">
                        {category}
                    </button>
                ))
            ) : (
                <div>
                    <h2 className="text-lg font-bold my-2">{selectedCategory}</h2>
                    <div className="flex flex-col">
                        {drinksByCategory[selectedCategory].map((drink, idx) => (
                            <div key={idx} className="bg-purple-700 p-3 rounded hover:bg-purple-600 m-2">
                                <h3>{drink.bottle_name}</h3>
                                {editingDrinkId === drink.firebaseId ? (
                                    <div className="bg-purple-600 p-3 rounded mt-2">
                                        <p>
                                            Price: $
                                            <input
                                                type="text"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                className="bg-white text-black rounded p-1"
                                            />
                                        </p>
                                        <p>
                                            Quantity:
                                            <input
                                                type="text"
                                                name="quantity"
                                                value={formData.quantity}
                                                onChange={handleInputChange}
                                                className="bg-white text-black rounded p-1"
                                            />
                                        </p>
                                        <p>
                                            Alcohol %:
                                            <input
                                                type="text"
                                                name="alcohol_percentage"
                                                value={formData.alcohol_percentage}
                                                onChange={handleInputChange}
                                                className="bg-white text-black rounded p-1"
                                            />
                                        </p>
                                        <p>
                                            Notes:
                                            <input
                                                type="text"
                                                name="notes"
                                                value={formData.notes}
                                                onChange={handleInputChange}
                                                className="bg-white text-black rounded p-1"
                                            />
                                        </p>
                                        <button onClick={handleSaveClick} className="bg-green-600 p-2 rounded mt-2">
                                            Save
                                        </button>
                                        <button onClick={handleCancelClick} className="bg-red-600 p-2 rounded mt-2 ml-2">
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div className="bg-purple-600 p-3 rounded mt-2">
                                        <p>Price: ${drink.price}</p>
                                        <p>Quantity: {drink.quantity}</p>
                                        <p>Alcohol %: {drink.description.alcohol_percentage}</p>
                                        <p>Notes: {drink.description.notes}</p>
                                        <button onClick={() => handleEditClick(drink)} className="bg-[#ca8a04] p-2 rounded">
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setSelectedCategory(null)} className="bg-[#ca8a04] p-2 rounded mt-4">
                        Back to Categories
                    </button>
                </div>
            )}
        </div>
    );
}

export default StockReports;
