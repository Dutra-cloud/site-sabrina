import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/admin/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="produtos" element={<ProductsPage />} />
              <Route path="produto/:id" element={<ProductDetailsPage />} />
              <Route path="sobre" element={<AboutPage />} />
              <Route path="contato" element={<ContactPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="*" element={<div className="text-center py-20">Página não encontrada</div>} />
            </Route>
          </Routes>
        </ThemeProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
