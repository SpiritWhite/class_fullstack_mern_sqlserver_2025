import React from 'react';
import './WithLoadingSpinner.css';

const withLoadingSpinner = (WrappedComponent) => {
  const WithLoadingSpinner = (props) => {
    const { isLoading, ...otherProps } = props;

    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Calculando estadísticas...</p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...otherProps} />;
  };

  // Asignar un displayName para mejor debugging
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithLoadingSpinner.displayName = `WithLoadingSpinner(${wrappedComponentName})`;

  return WithLoadingSpinner;
};

export default withLoadingSpinner;