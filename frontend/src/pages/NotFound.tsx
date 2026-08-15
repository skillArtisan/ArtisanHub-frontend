import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-illustration">
          <div className="not-found-code">404</div>
          <Search className="not-found-icon" size={64} />
        </div>

        <div className="not-found-text">
          <h1>Page Not Found</h1>
          <p className="not-found-description">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="not-found-actions">
          <button 
            className="primary-action" 
            onClick={() => navigate('/')}
          >
            <Home size={20} />
            Go to Home
          </button>
          <button 
            className="ghost-action" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        <div className="not-found-suggestions">
          <h3>What you can do:</h3>
          <ul>
            <li>Check the URL for typos</li>
            <li>Return to the homepage and navigate from there</li>
            <li>Use the search feature to find what you need</li>
            <li>Contact support if you think this is an error</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
