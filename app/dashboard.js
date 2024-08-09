import Card from "./components/Card"; // Assuming Card is a separate component now

function Dashboard({ onNavigate, onLogout }) {
  return (
    <div className="h-screen bg-[#0f0529] flex flex-col items-center">
      <div className="w-full flex justify-between items-center p-5">
        <div className="flex-grow text-center">
          {" "}
          {/* Empty div for centering the title */}
        </div>
        <h1 className="text-[#ca8a04] font-bold text-6xl absolute left-1/2 transform -translate-x-1/2">
          Dashboard
        </h1>
        <button
          onClick={onLogout}
          className="p-4 bg-[#ca8a04] text-white font-bold rounded hover:bg-yellow-700"
        >
          Logout
        </button>
      </div>
      <div className="mt-40 grid grid-cols-3  gap-4">
        {" "}
        {/* Adjust margin top as needed */}
        <Card
          title="Stock reports"
          onClick={() => onNavigate("stockReports")}
        />
        <Card
          title="Scan & Manage"
          onClick={() => onNavigate("scanAndManage")}
        />
        <Card
          title="Stock Insertion"
          onClick={() => onNavigate("stockInsertion")}
        />
      </div>
    </div>
  );
}

export default Dashboard;
