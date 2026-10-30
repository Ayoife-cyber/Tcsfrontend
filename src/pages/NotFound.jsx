import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="max-w-2xl mx-auto px-5 py-32 text-center">
    <p className="font-display text-7xl text-gold mb-4">404</p>
    <h1 className="font-display text-3xl text-cream mb-4">Page Not Found</h1>
    <p className="text-cream/60 mb-8">The page you're looking for doesn't exist.</p>
    <Link to="/" className="text-gold underline">Return Home</Link>
  </div>
);

export default NotFound;
