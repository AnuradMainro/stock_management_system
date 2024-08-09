
// import React, { useEffect, useState } from "react";
// import { getDatabase, ref, onValue } from "firebase/database";
// import app from "../_utils/firebase";

// function StockReports({ onBack }) {
//   const [drinksByCategory, setDrinksByCategory] = useState({});
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [visibleDetails, setVisibleDetails] = useState(null);

//   useEffect(() => {
//     const db = getDatabase(app);
//     const drinksRef = ref(db, "drinks");

//     onValue(drinksRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const categories = {};
//         Object.values(data).forEach(drink => {
//           if (!categories[drink.category]) {
//             categories[drink.category] = [];
//           }
//           categories[drink.category].push(drink);
//         });
//         setDrinksByCategory(categories);
//       }
//     });

//     return () => console.log("Component unmounting, cleanup can be handled by Firebase internally");
//   }, []);

//   const toggleDetails = (drinkId) => {
//     setVisibleDetails(prevId => prevId === drinkId ? null : drinkId);
//   };

//   return (
//     <div className="bg-gradient-to-b from-purple-500 to-[#0F0529] min-h-screen p-4 text-white">
//       <button onClick={onBack} className="bg-yellow-600 p-2 rounded hover:bg-yellow-700">
//         Back
//       </button>
//       <h1 className="text-xl font-bold my-4">Stock Reports</h1>
//       {selectedCategory === null ? (
//         Object.keys(drinksByCategory).map((category, index) => (
//           <button key={index} onClick={() => setSelectedCategory(category)} className="bg-purple-700 p-3 rounded hover:bg-purple-600 m-2">
//             {category}
//           </button>
//         ))
//       ) : (
//         <div>
//           <h2 className="text-lg font-bold my-2">{selectedCategory}</h2>
//           <div className="flex flex-col">
//             {drinksByCategory[selectedCategory].map((drink, idx) => (
//               <div key={idx} className="bg-purple-700 p-3 rounded hover:bg-purple-600 m-2">
//                 <div className="flex justify-between items-center">
//                   <span>{drink.bottle_name}</span>
//                   <button onClick={() => toggleDetails(drink.id)}>
//                     {visibleDetails === drink.id ? "▲" : "▼"}  {/* Adjust arrow direction based on visibility */}
//                   </button>
//                 </div>
//                 {visibleDetails === drink.id && (
//                   <div className="bg-purple-600 p-3 rounded">
//                     <p>Price: ${drink.price}</p>
//                     <p>Quantity: {drink.quantity}</p>
//                     <p>Alcohol %: {drink.description.alcohol_percentage}</p>
//                     <p>Notes: {drink.description.notes}</p>
//                     <button className="bg-yellow-600 p-2 rounded">Edit</button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//           <button onClick={() => setSelectedCategory(null)} className="bg-yellow-600 p-2 rounded mt-4">
//             Back to Categories
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default StockReports;
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import app from "../_utils/firebase";

function StockReports({ onBack }) {
  const [drinksByCategory, setDrinksByCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleDetails, setVisibleDetails] = useState(null);  // This will hold the ID of the drink whose details are visible

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

    return () => console.log("Component unmounting, cleanup can be handled by Firebase internally");
  }, []);

  const toggleDetails = (drinkId) => {
    // Toggle logic to ensure only one can be open at a time
    if (visibleDetails === drinkId) {
      setVisibleDetails(null);  // If clicking on the currently open dropdown, close it
    } else {
      setVisibleDetails(drinkId);  // Else open the clicked one and close others
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-500 to-[#0F0529] min-h-screen p-4 text-white">
      <button onClick={onBack} className="bg-yellow-600 p-2 rounded hover:bg-yellow-700">
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
                <div className="flex justify-between items-center">
                  <span>{drink.bottle_name}</span>
                  <button onClick={() => toggleDetails(drink.id)}>
                    {visibleDetails === drink.id ? "▲" : "▼"}  {/* Adjust arrow direction based on visibility */}
                  </button>
                </div>
                {visibleDetails === drink.id && (
                  <div className="bg-purple-600 p-3 rounded">
                    <p>Price: ${drink.price}</p>
                    <p>Quantity: {drink.quantity}</p>
                    <p>Alcohol %: {drink.description.alcohol_percentage}</p>
                    <p>Notes: {drink.description.notes}</p>
                    <button className="bg-yellow-600 p-2 rounded">Edit</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button onClick={() => setSelectedCategory(null)} className="bg-yellow-600 p-2 rounded mt-4">
            Back to Categories
          </button>
        </div>
      )}
    </div>
  );
}

export default StockReports;
