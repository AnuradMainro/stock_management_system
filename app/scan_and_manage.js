import React from 'react';
import Card from './components/Card';  // Assuming Card is a separate component

function ScanAndManage({ onBack, onNavigate }) {
  return (
    <div className="h-screen bg-purple-800 flex flex-col items-center justify-center">
      <button onClick={onBack} className="self-start p-4 m-4 bg-yellow-600 text-white font-bold rounded hover:bg-yellow-700">Back</button>
      <h1 className="font-bold text-yellow-600 text-2xl mb-6">Scan & Manage</h1>
      <div className="grid grid-cols-2 gap-4 p-4">
        <Card title="Return" /> 
        <Card title="Stock reports" onClick={() => onNavigate('stockReports')} />
      </div>
    </div>
  );
}

export default ScanAndManage;
