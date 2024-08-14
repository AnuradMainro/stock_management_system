import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import app from "../_utils/firebase"; // Ensure this path matches your Firebase config import

function LowStockReports({ onBack }) {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const drinksRef = ref(db, 'drinks');
    onValue(drinksRef, (snapshot) => {
      const data = snapshot.val();
      const lowStock = [];
      Object.keys(data).forEach(key => {
        const item = data[key];
        if (item.quantity < 15) {
          lowStock.push({ ...item, firebaseId: key });
        }
      });
      setLowStockItems(lowStock);
    });
  }, []);

  return (
    <div className="bg-[#0F0529] min-h-screen p-4 text-white">
      <button
        onClick={onBack}
        className="bg-yellow-600 p-2 rounded hover:bg-yellow-700"
      >
        Back
      </button>
      <h1 className="text-4xl font-bold my-4 text-center text-yellow-600">
        Low Stock Items
      </h1>
      <div className="flex flex-col">
        {lowStockItems.map((item, idx) => (
          <div key={idx} className="bg-purple-900 p-3 rounded hover:bg-purple-600 m-2">
            <h3>{item.bottle_name}</h3>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LowStockReports;
