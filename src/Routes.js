import { Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard/DashboardScreen";
import Products from "./components/Products";
import Settings from "./components/Settings";
import Users from "./components/Users";

export default function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/products" element={<Products />} />
      <Route exact path="/users" element={<Users />} />
      <Route exact path="/settings" element={<Settings />} />
    </Routes>
  );
}
