// dashboard.js
import Card from './components/card';  // Assuming Card is a separate component now

function Dashboard({ onNavigate, onLogout }) {
  return (
    <div className="h-screen bg-purple-800 flex flex-col items-center justify-center">
      <button onClick={onLogout} className="self-start p-4 m-4 bg-yellow-600 text-white font-bold rounded hover:bg-yellow-700">Logout</button>
      <h1 className="font-bold text-yellow-600 text-2xl mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 p-4">
        <Card title="Stock reports" />
        <Card title="Scan & Manage" onClick={() => onNavigate('scanAndManage')} />
        <Card title="Stock Insertion" />
      </div>
    </div>
  );
}

export default Dashboard;
