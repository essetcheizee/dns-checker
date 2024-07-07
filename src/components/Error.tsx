import React from 'react';

interface Props {
  message: string;
}

const Error: React.FC<Props> = ({ message }) => (
  <div style={{ color: 'red' }}>
    <h2>Error</h2>
    <p>{message}</p>
  </div>
);

export default Error;
