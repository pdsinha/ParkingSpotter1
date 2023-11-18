import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage">
      {/* Link to the Login Page */}
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}

export default HomePage;