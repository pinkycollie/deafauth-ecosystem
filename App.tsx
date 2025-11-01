import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white items-center">
      <Header />
      <main className="flex-grow w-full container mx-auto flex items-center justify-center p-4">
        <MainContent />
      </main>
      <Footer />
    </div>
  );
};

export default App;