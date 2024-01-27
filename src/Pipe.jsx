import React from 'react';

const Pipe = ({ pipeStyle }) => {
  return (
    <div
      style={{
        width: '50px',
        height: pipeStyle.height,
        backgroundColor: 'green',
        position: 'absolute',
        top: pipeStyle.y,
        left: pipeStyle.x,
      }}
    />
  );
};

export default Pipe;
