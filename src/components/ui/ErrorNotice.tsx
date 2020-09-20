import React from 'react';

const ErrorNotice = ({
  message,
  clearError,
}: {
  message: string;
  clearError: () => void;
}) => {
  return (
    <div>
      <span>{message}</span>
      <button onClick={clearError}>x</button>
    </div>
  );
};

export default ErrorNotice;
