// components/Card.js
function Card({ title, onClick }) {
    return (
      <div className="bg-yellow-600 p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer" onClick={onClick}>
        <h2 className="text-lg text-white">{title}</h2>
      </div>
    );
  }
  
  export default Card;
  
  // This is a test by noor
  