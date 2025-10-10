import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full p-4 mt-8 border-t border-gray-700/50 text-center">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} The DeafAuth Project. All actions are governed by the Fibonrose protocol.
      </p>
    </footer>
  );
};

export default Footer;