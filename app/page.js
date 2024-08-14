"use client";

import React, { useState } from "react";
import { AuthContextProvider } from "./_utils/auth-context";
import Login from "./components/Login";
import Dashboard from "./dashboard";
import ScanAndManage from "./scan_and_manage";
import StockInsertion from "./stock_insertion";
import StockReports from "./pages/stock-reports";
import CategoryDrinks from "./components/CategoryDrinks"; // Ensure this component is implemented
import LowStockReports from "./pages/LowStockReports"; // Corrected import path

function Page() {
  const [view, setView] = useState("login");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const login = (user) => {
    if (user) {
      setView("dashboard");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  const navigateTo = (page, category = null) => {
    setSelectedCategory(category); // Set the selected category if needed
    setView(page);
  };

  return (
    <AuthContextProvider>
      {view === "login" && <Login onLogin={() => navigateTo("dashboard")} />}
      {view === "dashboard" && <Dashboard onNavigate={navigateTo} onLogout={() => navigateTo("login")} />}
      {view === "stockReports" && (
        <StockReports
          onNavigateToLowStock={() => navigateTo("lowStockReports")}
          onBack={() => navigateTo("dashboard")}
        />
      )}
      {view === "lowStockReports" && <LowStockReports onBack={() => navigateTo("dashboard")} />}
      {view === "scanAndManage" && <ScanAndManage onBack={() => navigateTo("dashboard")} />}
      {view === "stockInsertion" && <StockInsertion onBack={() => navigateTo("dashboard")} />}
      {view === "categoryDrinks" && (
        <CategoryDrinks
          category={selectedCategory}
          onBack={() => navigateTo("stockReports")}
        />
      )}
    </AuthContextProvider>
  );
}

export default Page;
