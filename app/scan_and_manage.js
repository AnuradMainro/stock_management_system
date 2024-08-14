import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  update,
  increment,
} from "firebase/database";
import app from "./_utils/firebase";

const ProductRow = ({
  id,
  name,
  onIncrement,
  onDecrement,
  onDelete,
  quantity,
  onQuantityChange,
}) => {
  return (
    <div className="flex justify-between items-center text-white my-2 p-2 bg-[#0f0529] rounded">
      <span>{name}</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={onDecrement}
          className="bg-[#ca8a04] rounded-full w-8 h-8 flex items-center justify-center text-lg"
        >
          -
        </button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => onQuantityChange(id, parseInt(e.target.value))}
          className="w-16 text-center text-black rounded"
        />
        <button
          onClick={onIncrement}
          className="bg-[#ca8a04] rounded-full w-8 h-8 flex items-center justify-center text-lg"
        >
          +
        </button>
        <button
          onClick={() => onDelete(id)}
          className="bg-red-600 text-white p-2 rounded"
        >
          Delete
        </button>
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
    const drinksRef = ref(db, "drinks");
    onValue(drinksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedDrinks = Object.keys(data).map((key) => ({
          ...data[key],
          firebaseId: key,
        }));
        setDrinks(loadedDrinks);
      }
    });
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
        const matchedDrink = drinks.find(drink => drink.SKU === searchTerm);
        if (matchedDrink) {
            handleAddProduct(matchedDrink);
        }
    }
}, [searchTerm, drinks]);

  const handleAddProduct = (drink) => {
    const newProduct = {
      id: drink.firebaseId,
      name: drink.bottle_name,
      quantity: 1,
    };
    const productIndex = products.findIndex(
      (product) => product.id === newProduct.id
    );
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
    const newProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setProducts(newProducts);
  };

  const decrementQuantity = (id) => {
    const newProducts = products.map((product) => {
      if (product.id === id && product.quantity > 0) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setProducts(newProducts);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const newProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setProducts(newProducts);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const updateData = () => {
    const db = getDatabase(app);
    const updates = {};
    products.forEach((product) => {
      updates[`/drinks/${product.id}/quantity`] = increment(-product.quantity);
    });
    update(ref(db), updates)
      .then(() => {
        alert("Inventory updated successfully!");
        setProducts([]); // Clear the list after updating
      })
      .catch((error) => {
        console.error("Failed to update inventory:", error);
        alert("Failed to update inventory.");
      });
  };

  const filteredDrinks = drinks.filter(
    (drink) =>
      drink.bottle_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drink.SKU.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
