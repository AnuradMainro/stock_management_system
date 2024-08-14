import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import app from "../_utils/firebase"; // Ensure this path matches your Firebase config import

function StockReports({ onBack, onNavigateToLowStock }) {
  const [drinksByCategory, setDrinksByCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingDrinkId, setEditingDrinkId] = useState(null); // To track which drink is being edited
  const [formData, setFormData] = useState({}); // To track form data for the drink being edited
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [searchResults, setSearchResults] = useState([]); // To store search results

  useEffect(() => {
    const db = getDatabase(app);
    const drinksRef = ref(db, "drinks");
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
        // Update search results if there's an active search term
        if (searchTerm) {
          updateSearchResults(searchTerm, categories);
        }
      }
    });
  }, [searchTerm]);

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
      [`/drinks/${editingDrinkId}/description/alcohol_percentage`]:
        formData.alcohol_percentage,
      [`/drinks/${editingDrinkId}/description/notes`]: formData.notes,
    };

    update(ref(db), updates)
      .then(() => {
        alert("Data updated successfully!");
        // Update local state immediately
        const updatedDrinksByCategory = { ...drinksByCategory };
        Object.keys(updatedDrinksByCategory).forEach((category) => {
          updatedDrinksByCategory[category] = updatedDrinksByCategory[
            category
          ].map((drink) => {
            if (drink.firebaseId === editingDrinkId) {
              return {
                ...drink,
                ...formData,
                description: { ...drink.description, ...formData },
              };
            }
            return drink;
          });
        });
        setDrinksByCategory(updatedDrinksByCategory);
        updateSearchResults(searchTerm, updatedDrinksByCategory);
        setEditingDrinkId(null); // Exit edit mode after saving
      })
      .catch((error) => {
        console.error("Failed to update data:", error);
        alert("Failed to update data.");
      });
  };

  const handleCancelClick = () => {
    setEditingDrinkId(null); // Exit edit mode without saving
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Search for drinks directly by name or SKU
    updateSearchResults(value, drinksByCategory);
  };

  const updateSearchResults = (searchTerm, drinksByCategory) => {
    if (searchTerm) {
      const results = [];
      Object.keys(drinksByCategory).forEach((category) => {
        drinksByCategory[category].forEach((drink) => {
          if (
            drink.bottle_name.toLowerCase().includes(searchTerm) ||
            drink.SKU.toString().includes(searchTerm) // Search by SKU as well
          ) {
            results.push(drink);
          }
        });
      });
      setSearchResults(results);
    } else {
      setSearchResults([]); // Clear search results if search is cleared
    }
  };

  return (
    <div className="bg-[#0F0529] min-h-screen p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onBack}
          className="bg-yellow-600 p-2 rounded hover:bg-yellow-700"
        >
          Back
        </button>
        {selectedCategory === null && (
          <button
            onClick={onNavigateToLowStock}
            className="bg-red-600 p-2 rounded hover:bg-red-700"
          >
            View Low Stock
          </button>
        )}
        {selectedCategory !== null && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="bg-yellow-600 p-2 rounded hover:bg-yellow-700"
          >
            Back to Categories
          </button>
        )}
      </div>
      <h1 className="text-4xl font-bold my-4 text-center text-yellow-600">
        Stock Reports
      </h1>
      <input
        type="text"
        placeholder="Search for a bottle or SKU..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 rounded bg-white text-black w-full mb-4"
      />
      {searchResults.length > 0 ? (
        <div>
          <h2 className="text-lg font-bold my-2">Search Results</h2>
          <div className="flex flex-col">
            {searchResults.map((drink, idx) => (
              <div
                key={idx}
                className="bg-purple-900 p-3 rounded hover:bg-purple-600 m-2"
              >
                <h3>{drink.bottle_name}</h3>
                {editingDrinkId === drink.firebaseId ? (
                  <div className="bg-purple-600 p-3 rounded mt-2">
                    <p>
                      Price: 
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
                    <button
                      onClick={handleSaveClick}
                      className="bg-green-600 p-2 rounded mt-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="bg-red-600 p-2 rounded mt-2 ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="bg-purple-600 p-3 rounded mt-2">
                    <p>Price: {drink.price}</p>
                    <p>Quantity: {drink.quantity}</p>
                    <p>Alcohol %: {drink.description.alcohol_percentage}</p>
                    <p>Notes: {drink.description.notes}</p>
                    <button
                      onClick={() => handleEditClick(drink)}
                      className="bg-yellow-600 p-2 rounded"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : selectedCategory === null ? (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6 mb-4">
          {Object.keys(drinksByCategory).map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className="bg-purple-700 p-3 rounded hover:bg-purple-600 text-center w-full"
            >
              {category}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold my-2">{selectedCategory}</h2>
          <div className="flex flex-col">
            {drinksByCategory[selectedCategory]?.map((drink, idx) => (
              <div
                key={idx}
                className="bg-purple-700 p-3 rounded hover:bg-purple-600 m-2"
              >
                <h3>{drink.bottle_name}</h3>
                {editingDrinkId === drink.firebaseId ? (
                  <div className="bg-purple-600 p-3 rounded mt-2">
                    <p>
                      Price: 
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
                    <button
                      onClick={handleSaveClick}
                      className="bg-green-600 p-2 rounded mt-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="bg-red-600 p-2 rounded mt-2 ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="bg-purple-600 p-3 rounded mt-2">
                    <p>Price: {drink.price}</p>
                    <p>Quantity: {drink.quantity}</p>
                    <p>Alcohol %: {drink.description.alcohol_percentage}</p>
                    <p>Notes: {drink.description.notes}</p>
                    <button
                      onClick={() => handleEditClick(drink)}
                      className="bg-yellow-600 p-2 rounded"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StockReports;
