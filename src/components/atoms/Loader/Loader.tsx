import React from 'react';
import './loader.css';

export const Loader: React.FC = React.memo(() => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
});
