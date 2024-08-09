import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import app from "../_utils/firebase";

function StockReports({ onBack }) {
  const [drinksByCategory, setDrinksByCategory] = useState({});

  useEffect(() => {
    const db = getDatabase(app);
    const drinksRef = ref(db, "drinks");

    onValue(drinksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const categories = {};
        Object.values(data).forEach(drink => {
          if (!categories[drink.category]) {
            categories[drink.category] = [];
          }
          categories[drink.category].push(drink);
        });
        setDrinksByCategory(categories);
      }
    });

    return () => {
      console.log("Component unmounting, cleanup can be handled by Firebase internally");
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-purple-500 to-[#0F0529] min-h-screen p-4 text-white">
      <button onClick={onBack} className="bg-yellow-600 p-2 rounded hover:bg-yellow-700">
        Back
      </button>
      <h1 className="text-xl font-bold my-4">Stock Reports</h1>
      {Object.keys(drinksByCategory).map((category, index) => (
        <div key={index}>
          <h2 className="text-lg font-bold my-2">{category}</h2>
          <div className="grid grid-cols-3 gap-4">
            {drinksByCategory[category].map((drink, idx) => (
              <div key={idx} className="bg-purple-700 p-3 rounded hover:bg-purple-600">
                <h3>{drink.bottle_name}</h3>
                <p>{drink.manufacturer}</p>
                <p>Volume: {drink.volume}</p>
                <p>Price: {drink.price}</p>
                <p>Alcohol %: {drink.description.alcohol_percentage}</p>
                <p>Notes: {drink.description.notes}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StockReports;
