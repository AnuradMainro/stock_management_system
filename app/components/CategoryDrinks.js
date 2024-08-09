import React, { useEffect, useState } from "react";
import Link from "next/link";

function CategoryDrinks({ category, onBack }) {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetch("/drinks.json")
      .then((response) => response.json())
      .then((data) => {
        // Filter the drinks to only include those that match the selected category
        const filteredDrinks = data.drinks.filter(
          (drink) => drink.category === category
        );
        setDrinks(filteredDrinks);
      })
      .catch((error) => console.error("Error loading drinks data:", error));
  }, [category]); // Dependency array ensures this effect runs again if the category changes

  return (
    <div className="bg-purple-800 min-h-screen p-4 text-white">
      <button
        onClick={onBack}
        className="bg-yellow-600 p-2 rounded hover:bg-yellow-700"
      >
        Back to Categories
      </button>
      <h1 className="text-xl font-bold my-4">{category}</h1>
      <div className="grid grid-cols-3 gap-4">
        {drinks.map((drink) => (
          <div
            key={drink.SKU}
            className="bg-purple-700 p-3 rounded hover:bg-purple-600"
          >
            <h2>{drink.bottle_name}</h2>
            <p>{drink.manufacturer}</p>
            <p>Volume: {drink.volume}</p>
            <p>Price: {drink.price}</p>
            <p>Description: {drink.description.notes}</p>
            <p>Alcohol %: {drink.description.alcohol_percentage}</p>
            <p>SKU: {drink.SKU}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryDrinks;
