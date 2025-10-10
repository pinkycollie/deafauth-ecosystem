
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <MainContent />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
