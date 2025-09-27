import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-6 ">
      <div className="max-w-3xl mx-auto text-center">
        <p className="mb-2">&copy; 2025 WeatherApp. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <Link to="#" className="hover:underline">Privacy Policy</Link>
          <Link to="#" className="hover:underline">Terms of Service</Link>
          <Link to="#" className="hover:underline">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
