
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// function StockReports() {
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         fetch('/drinks.json')
//             .then(response => response.json())
//             .then(data => {
//                 // Create a new Set to store unique categories
//                 const uniqueCategories = new Set(data.drinks.map(drink => drink.category));
//                 // Convert the Set back to an array and update state
//                 setCategories([...uniqueCategories]);
//             })
//             .catch(error => console.error('Error loading drinks data:', error));
//     }, []);

//     return (
//         <div className="bg-purple-800 min-h-screen p-4 text-white">
//             <Link href="/dashboard" className="bg-yellow-600 p-2 rounded hover:bg-yellow-700">
//                 Back to Dashboard
//             </Link>
//             <h1 className="text-xl font-bold my-4">Drink Categories</h1>
//             <div className="grid grid-cols-3 gap-4">
//                 {categories.map((category, index) => (
//                     <div key={index} className="bg-purple-700 p-3 rounded hover:bg-purple-600">
//                         <h2>{category}</h2>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default StockReports;

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function StockReports({ onSelectCategory }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/drinks.json')
            .then(response => response.json())
            .then(data => {
                const uniqueCategories = new Set(data.drinks.map(drink => drink.category));
                setCategories([...uniqueCategories]);
            })
            .catch(error => console.error('Error loading drinks data:', error));
    }, []);

    return (
        <div className="bg-purple-800 min-h-screen p-4 text-white">
            <Link href="/dashboard" className="bg-yellow-600 p-2 rounded hover:bg-yellow-700">
                Back to Dashboard
            </Link>
            <h1 className="text-xl font-bold my-4">Drink Categories</h1>
            <div className="grid grid-cols-3 gap-4">
                {categories.map((category, index) => (
                    <div key={index} className="bg-purple-700 p-3 rounded hover:bg-purple-600 cursor-pointer"
                         onClick={() => onSelectCategory(category)}>
                        <h2>{category}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StockReports;
