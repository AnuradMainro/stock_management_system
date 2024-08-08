
"use client";

// import React, { useState } from "react";
// import { AuthContextProvider } from "./_utils/auth-context"; // Adjust the path as necessary
// import Login from "./components/Login";
// import Dashboard from "./dashboard";
// import ScanAndManage from "./scan_and_manage";
// import StockInsertion from "./stock_insertion";
// import StockReports from "./pages/stock-reports"; // Ensure this path is correct

// function Page() {
//   const [view, setView] = useState("login");

//   const login = (user) => {
//     if (user) {
//       setView("dashboard");
//     } else {
//       alert("Login failed. Please check your credentials.");
//     }
//   };

//   const navigateTo = (page) => {
//     setView(page);
//   };

//   return (
//     <AuthContextProvider>
//       {view === "login" ? (
//         <Login onLogin={login} />
//       ) : view === "dashboard" ? (
//         <Dashboard
//           onNavigate={navigateTo}
//           onLogout={() => navigateTo("login")}
//         />
//       ) : view === "scanAndManage" ? (
//         <ScanAndManage onBack={() => navigateTo("dashboard")} />
//       ) : view === "stockInsertion" ? (
//         <StockInsertion onBack={() => navigateTo("dashboard")} />
//       ) : view === "stockReports" ? ( // Handle navigation to StockReports
//         <StockReports onBack={() => navigateTo("dashboard")} />
//       ) : null}
//     </AuthContextProvider>
//   );
// }

// export default Page;

import React, { useState } from "react";
import { AuthContextProvider } from "./_utils/auth-context";
import Login from "./components/Login";
import Dashboard from "./dashboard";
import ScanAndManage from "./scan_and_manage";
import StockInsertion from "./stock_insertion";
import StockReports from "./pages/stock-reports";
import CategoryDrinks from "./components/CategoryDrinks"; // Ensure this component is created

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
    setSelectedCategory(category); // Set the selected category
    setView(page);
  };

  return (
    <AuthContextProvider>
      {view === "login" ? (
        <Login onLogin={login} />
      ) : view === "dashboard" ? (
        <Dashboard onNavigate={navigateTo} onLogout={() => navigateTo("login")}
        />
      ) : view === "scanAndManage" ? (
        <ScanAndManage onBack={() => navigateTo("dashboard")} />
      ) : view === "stockInsertion" ? (
        <StockInsertion onBack={() => navigateTo("dashboard")} />
      ) : view === "stockReports" ? (
        <StockReports onSelectCategory={(category) => navigateTo("categoryDrinks", category)} />
      ) : view === "categoryDrinks" ? (
        <CategoryDrinks category={selectedCategory} onBack={() => navigateTo("stockReports")} />
      ) : null}
    </AuthContextProvider>
  );
}

export default Page;
