import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Loyalty from "./pages/Loyalty";
import OrdersPage from "./pages/Orders";
import ProductsPage from "./pages/Products";
import UsersPage from "./pages/Users";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/fidelity" element={<Loyalty />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
