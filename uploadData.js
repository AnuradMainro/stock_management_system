import { db } from './app/_utils/firebase'; // Correct the path as needed
import { collection, addDoc } from 'firebase/firestore';

// Import your drinks data directly if it's a JavaScript array or read from a JSON file
import drinksData from './drinks.json'; // Assuming the data is exported as default

const uploadData = async () => {
  const colRef = collection(db, 'drinks');
  for (const drink of drinksData.drinks) { // Ensure you navigate the JSON structure correctly
    await addDoc(colRef, drink).then(docRef => {
      console.log("Document written with ID: ", docRef.id);
    }).catch(error => {
      console.error("Error adding document: ", error);
    });
  }
};

uploadData(); // Call the function to execute the upload
