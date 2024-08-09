// components/Card.js
function Card({ title, onClick }) {
    return (
      <div className="bg-[#ca8a04] p-8 rounded-xl shadow-lg h-[200px] hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer" onClick={onClick}>
        <h2 className="text-lg font-bold text-white flex items-center h-full">{title}</h2>
      </div>
    );
  }
  
  export default Card;

  
  