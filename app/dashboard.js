import Card from './components/Card';  // Assuming Card is a separate component now

function Dashboard({ onNavigate, onLogout }) {
  return (
    <div className="h-screen bg-purple-800 flex flex-col items-center justify-center">
      <button onClick={onLogout} className="self-start p-4 m-4 bg-yellow-600 text-white font-bold rounded hover:bg-yellow-700">Logout</button>
      <h1 className="font-bold text-yellow-600 text-2xl mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 p-4">
        {/* Attach onClick event handler to each card to handle navigation */}
        <Card title="Stock reports" onClick={() => onNavigate('stockReports')} />
        <Card title="Scan & Manage" onClick={() => onNavigate('scanAndManage')} />
        <Card title="Stock Insertion" onClick={() => onNavigate('stockInsertion')} />
      </div>
    </div>
  );
}

export default Dashboard;
